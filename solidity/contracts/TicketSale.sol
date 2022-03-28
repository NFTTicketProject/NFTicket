// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./MyTicket.sol";
import "./ShowScheduleManager.sol";

contract TicketSale is Ownable, IERC721Receiver {
    using SafeMath for uint256;

    uint256 private _ticketId;
    address private _seller;
    string private _description;
    uint256 private _price;
    bool private _isCancelled;
    bool private _isEnded;
    uint256 private _startedAt;
    uint256 private _endedAt;
    ShowScheduleManager private _showScheduleManagerContract;
    IERC20 private _currencyContract;
    MyTicket private _ticketContract;

    constructor(
        uint256 ticketId,
        address seller,
        string memory description,
        uint256 price,
        uint256 startedAt,
        uint256 endedAt,
        address showScheduleManagerContractAddress,
        address currencyContractAddress,
        address ticketContractAddress
    ) {
        require(price > 0);
        _ticketId = ticketId;
        _seller = seller;
        _description = description;
        _price = price;
        _startedAt = block.timestamp + startedAt;
        _endedAt = block.timestamp + endedAt;
        _showScheduleManagerContract = ShowScheduleManager(showScheduleManagerContractAddress);
        _currencyContract = IERC20(currencyContractAddress);
        _ticketContract = MyTicket(ticketContractAddress);
    }

    function end() private {
        _isEnded = true;
    }

    function cancel() public {
        _isCancelled = true;
    }

    function balanceOf() public view returns(uint256) {
        return _currencyContract.balanceOf(address(this));
    }

    function purchase() public payable ActiveSale {        
        uint256 showScheduleId = _ticketContract.getShowScheduleId(_ticketId);
        uint256 classId = _ticketContract.getClassId(_ticketId);
        uint256 classPrice = _showScheduleManagerContract.getTicketClassPrice(showScheduleId, classId);

        // 판매자가 티켓 주인인가 확인
        require(_ticketContract.ownerOf(_ticketId) == _seller);

        // 구매자에게 현재 잔고가 있는가 확인
        require(_currencyContract.balanceOf(msg.sender) >= classPrice);

        // 판매자에게서 구매자에게 티켓 전송
        _ticketContract.transferFrom(_seller, msg.sender, _ticketId);

        // 구매자에게서 CA로 토큰 지불
        _currencyContract.transferFrom(msg.sender, address(this), classPrice);

        end();
    }

    function withdraw() public payable EndedSale onlySeller {
        uint256 showScheduleId = _ticketContract.getShowScheduleId(_ticketId);
        (, uint8 royaltyRatePercent, ) = _showScheduleManagerContract.getResellPolicy(showScheduleId);

        uint256 contractBalance = _currencyContract.balanceOf(address(this));
        uint256 ownerAmount = contractBalance.mul(royaltyRatePercent).div(100);
        uint256 sellerAmount = contractBalance.sub(ownerAmount);
        _currencyContract.transfer(_seller, sellerAmount);
        
        uint256 contractBalanceAfterTransfer = _currencyContract.balanceOf(address(this));
        _currencyContract.transfer(owner(), contractBalanceAfterTransfer);
    }

    function getStartTimeLeft() public view returns(uint256) {
        require(_startedAt > block.timestamp, "This sale is already started");
        return _startedAt - block.timestamp;
    }

    function getEndTimeLeft() public view returns(uint256) {
        require(_endedAt > block.timestamp, "This sale is already ended");
        return _endedAt - block.timestamp;
    }

    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes memory _data) external pure returns(bytes4)
    {
        return this.onERC721Received.selector;
    }

    modifier onlySeller() {
        require(msg.sender == _seller);
        _;
    }

    modifier ActiveSale() {
        require(_startedAt > block.timestamp, "This sale is not started yet");
        require(_endedAt > block.timestamp, "This sale is already ended");
        require(!_isCancelled);
        require(!_isEnded);
        _;
    }

    modifier EndedSale() {
        require(_isEnded);
        _;
    }
}
