// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./TicketSale.sol";

contract TicketSaleManager is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _ticketSaleId;
    mapping(uint256 => address) private _ticketSales;
    mapping(address => uint256[]) private _ticketSaleIdsByOwner;
    mapping(uint256 => Counters.Counter) private _ticketSaleCountsByTicket;
    address private _currencyContractAddress;
    address private _ticketContractAddress;

    constructor(address currencyContractAddress, address ticketContractAddress) {
        _currencyContractAddress = currencyContractAddress;
        _ticketContractAddress = ticketContractAddress;
    }

    function create(uint256 ticketId, string memory description, uint256 price, uint256 startedAt, uint256 endedAt, bool isResell) public {
        _ticketSaleId.increment();

        uint256 newTicketSaleId = _ticketSaleId.current();
        TicketSale newTicketSale = new TicketSale(ticketId, description, price, startedAt, endedAt, isResell, _currencyContractAddress, _ticketContractAddress);
        newTicketSale.transferOwnership(msg.sender);

        _ticketSales[newTicketSaleId] = address(newTicketSale);
        _ticketSaleIdsByOwner[msg.sender].push(newTicketSaleId);
        _ticketSaleCountsByTicket[ticketId].increment();
    }

    function cancel(uint256 ticketSaleId) public {
        address ticketSaleAddr = _ticketSales[ticketSaleId];
        TicketSale(ticketSaleAddr).cancel();
    }

    function balanceOf(uint256 ticketSaleId) public view returns(uint256) {
        address ticketSaleAddr = _ticketSales[ticketSaleId];
        return TicketSale(ticketSaleAddr).balanceOf();
    }

    function purchase(uint256 ticketSaleId) public payable {
        address ticketSaleAddr = _ticketSales[ticketSaleId];
        TicketSale(ticketSaleAddr).purchase();
    }

    function withdraw(uint256 ticketSaleId) public payable {
        address ticketSaleAddr = _ticketSales[ticketSaleId];
        TicketSale(ticketSaleAddr).withdraw();
    }

    function getStartTimeLeft(uint256 ticketSaleId) public view returns(uint256) {
        address ticketSaleAddr = _ticketSales[ticketSaleId];
        return TicketSale(ticketSaleAddr).getStartTimeLeft();
    }

    function getEndTimeLeft(uint256 ticketSaleId) public view returns(uint256) {
        address ticketSaleAddr = _ticketSales[ticketSaleId];
        return TicketSale(ticketSaleAddr).getEndTimeLeft();
    }

    function getCount() public returns(uint256) {
        return _ticketSaleId.current();
    }

    function getTicketSales(address walletId) public returns(uint256[] memory) {
        return _ticketSaleIdsByOwner[walletId];
    }

    function getTicketSalesCount(uint256 ticketId) public returns(uint256) {
        return _ticketSaleCountsByTicket[ticketId].current();
    }
}