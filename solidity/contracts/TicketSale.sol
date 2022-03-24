// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MyTicket.sol";
import "./ShowScheduleManager.sol";

contract TicketSale is Ownable {
    uint256 public _ticketId;
    address public _seller;
    string public _description;
    uint256 public _price;
    bool public _isCancelled;
    bool public _isEnded;
    uint256 public _startedAt;
    uint256 public _endedAt;
    ShowScheduleManager private _showScheduleManagerContract;
    IERC20 private _currencyContract;
    MyTicket private _ticketContract;

    constructor(
        uint256 ticketId,
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
        uint256 showScheduleId = _ticketContract.ShowScheduleId(_ticketId);
        uint256 classId = _ticketContract.ClassId(_ticketId);
        uint256 classPrice = _showScheduleManagerContract.TicketClassPrice(showScheduleId, classId);

        // 판매자가 현재 소유주인가 확인
        require(_ticketContract.ownerOf(_ticketId) == owner());

        // 구매자에게 현재 잔고가 있는가 확인
        require(_currencyContract.balanceOf(msg.sender) >= classPrice);

        // 판매자에게서 구매자에게 티켓 전송
        _ticketContract.transferFrom(owner(), msg.sender, _ticketId);

        // 구매자에게서 CA로 토큰 지불
        _currencyContract.transferFrom(msg.sender, address(this), classPrice);

        end();
    }

    function withdraw() public payable EndedSale onlyOwner {
        uint256 contractBalance = _currencyContract.balanceOf(address(this));
        _currencyContract.transfer(owner(), contractBalance);
    }

    function getStartTimeLeft() public view returns(uint256) {
        require(_startedAt > block.timestamp, "This sale is already started");
        return _startedAt - block.timestamp;
    }

    function getEndTimeLeft() public view returns(uint256) {
        require(_endedAt > block.timestamp, "This sale is already ended");
        return _endedAt - block.timestamp;
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
