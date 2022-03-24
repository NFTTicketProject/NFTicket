// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MyTicket.sol";

contract TicketSale is Ownable {
    uint256 public _ticketId;
    address public _seller;
    string public _description;
    uint256 public _price;
    bool public _isCancelled;
    bool public _isEnded;
    uint256 public _startedAt;
    uint256 public _endedAt;
    bool private _isResell;
    IERC20 private _currencyContract;
    MyTicket private _ticketContract;

    constructor(
        uint256 ticketId,
        string memory description,
        uint256 price,
        uint256 startedAt,
        uint256 endedAt,
        bool isResell,
        address currencyContractAddress,
        address ticketContractAddress
    ) {
        require(price > 0);
        _ticketId = ticketId;
        _description = description;
        _price = price;
        _startedAt = block.timestamp + startedAt;
        _endedAt = block.timestamp + endedAt;
        _isResell = isResell;
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
        require(_ticketContract.IssuePrice(_ticketId) == msg.value);
        _ticketContract.transferFrom(owner(), msg.sender, _ticketId);
        end();
    }

    function withdraw() public payable EndedSale onlyOwner {
        _currencyContract.transfer(owner(), _currencyContract.balanceOf(address(this)));
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
