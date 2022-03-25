// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./TicketSale.sol";
import "./MyTicket.sol";
import "./ShowScheduleManager.sol";

contract TicketSaleManager is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _saleIds;
    mapping(uint256 => address) private _saleAddrs;
    mapping(address => uint256[]) private _saleIdsByWallet;
    mapping(uint256 => Counters.Counter) private _saleCountOfTicket;
    address private _showScheduleManagerContractAddress;
    address private _currencyContractAddress;
    address private _ticketContractAddress;

    constructor(address showScheduleManagerContractAddress, address currencyContractAddress, address ticketContractAddress) {
        _showScheduleManagerContractAddress = showScheduleManagerContractAddress;
        _currencyContractAddress = currencyContractAddress;
        _ticketContractAddress = ticketContractAddress;
    }

    function create(uint256 ticketId, address seller, string memory description, uint256 price, uint256 startedAt, uint256 endedAt) public {
        _saleIds.increment();

        uint256 showScheduleId = MyTicket(_ticketContractAddress).getShowScheduleId(ticketId);
        (bool isAvailable, , uint256 priceLimit) = ShowScheduleManager(_showScheduleManagerContractAddress).getResellPolicy(showScheduleId);
        require(isAvailable);
        require(price < priceLimit);

        uint256 newTicketSaleId = _saleIds.current();
        TicketSale newTicketSale = new TicketSale(ticketId, seller, description, price, startedAt, endedAt, _showScheduleManagerContractAddress, _currencyContractAddress, _ticketContractAddress);

        _saleAddrs[newTicketSaleId] = address(newTicketSale);
        _saleIdsByWallet[msg.sender].push(newTicketSaleId);
        _saleCountOfTicket[ticketId].increment();
    }

    function cancel(uint256 ticketSaleId) public {
        address ticketSaleAddr = _saleAddrs[ticketSaleId];
        TicketSale(ticketSaleAddr).cancel();
    }

    function balanceOf(uint256 ticketSaleId) public view returns(uint256) {
        address ticketSaleAddr = _saleAddrs[ticketSaleId];
        return TicketSale(ticketSaleAddr).balanceOf();
    }

    function purchase(uint256 ticketSaleId) public payable {
        address ticketSaleAddr = _saleAddrs[ticketSaleId];
        TicketSale(ticketSaleAddr).purchase();
    }

    function withdraw(uint256 ticketSaleId) public payable {
        address ticketSaleAddr = _saleAddrs[ticketSaleId];
        TicketSale(ticketSaleAddr).withdraw();
    }

    function getStartTimeLeft(uint256 ticketSaleId) public view returns(uint256) {
        address ticketSaleAddr = _saleAddrs[ticketSaleId];
        return TicketSale(ticketSaleAddr).getStartTimeLeft();
    }

    function getEndTimeLeft(uint256 ticketSaleId) public view returns(uint256) {
        address ticketSaleAddr = _saleAddrs[ticketSaleId];
        return TicketSale(ticketSaleAddr).getEndTimeLeft();
    }

    function getTotalSaleCount() public view returns(uint256) {
        return _saleIds.current();
    }

    function getSaleIdsByWallet(address walletAddr) public view returns(uint256[] memory) {
        return _saleIdsByWallet[walletAddr];
    }

    function getSaleCountOfTicket(uint256 ticketId) public view returns(uint256) {
        return _saleCountOfTicket[ticketId].current();
    }
}