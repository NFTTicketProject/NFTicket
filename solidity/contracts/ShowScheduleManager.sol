// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ShowSchedule.sol";
import "./MyTicket.sol";

contract ShowScheduleManager {
    using Counters for Counters.Counter;
    Counters.Counter private _showScheduleId;
    mapping(uint256 => address) private _showSchedules;
    mapping(address => uint256[]) private _showScheduleIdsByOwner;
    address private _currencyContractAddress;
    address private _ticketContractAddress;
    
    constructor(address currencyContractAddress, address ticketContractAddress) {
        _currencyContractAddress = currencyContractAddress;
        _ticketContractAddress = ticketContractAddress;
    }

    function create(
            uint64 showId,
            string memory stageName, 
            uint256 startedAt, 
            uint256 endedAt, 
            uint256 maxMintCount, 
            string[] memory ticketClassNames, 
            uint256[] memory ticketClassPrices, 
            uint256[] memory ticketClassMaxMintCounts
        ) public {
        _showScheduleId.increment();

        uint256 newShowScheduleId = _showScheduleId.current();
        ShowSchedule newShowSchedule = new ShowSchedule(showId, stageName, startedAt, endedAt, maxMintCount, ticketClassNames, ticketClassPrices, ticketClassMaxMintCounts, _currencyContractAddress, _ticketContractAddress);
        newShowSchedule.transferOwnership(msg.sender);

        _showSchedules[newShowScheduleId] = address(newShowSchedule);
        _showScheduleIdsByOwner[msg.sender].push(newShowScheduleId);
    }

    function TicketClassCount(uint256 showScheduleId) public view returns(uint256) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).TicketClassCount();
    }

    function TicketClassName(uint256 showScheduleId, uint256 ticketClassId) public view returns(string memory) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).TicketClassName(ticketClassId);
    }

    function TicketClassPrice(uint256 showScheduleId, uint256 ticketClassId) public view returns(uint256) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).TicketClassPrice(ticketClassId);
    }

    function TicketClassMaxMintCount(uint256 showScheduleId, uint256 ticketClassId) public view returns(uint256) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).TicketClassMaxMintCount(ticketClassId);
    }

    function cancel(uint256 showScheduleId) public {
        ShowSchedule(_showSchedules[showScheduleId]).cancel();
    }

    function registerTicket(uint256 showScheduleId, uint16 row, uint16 col, uint256 ticketId) public payable {
        address showScheduleAddr = _showSchedules[showScheduleId];
        ShowSchedule(showScheduleAddr).registerTicket(row, col, ticketId);
    }
    
    function revokeTicket(uint256 showScheduleId, uint16 row, uint16 col) public payable {
        address showScheduleAddr = _showSchedules[showScheduleId];
        ShowSchedule(showScheduleAddr).revokeTicket(row, col);
    }

    function refundTicket(uint256 showScheduleId, uint16 row, uint16 col) public payable {
        address showScheduleAddr = _showSchedules[showScheduleId];
        ShowSchedule(showScheduleAddr).refundTicket(row, col);
    }

    function getCount() public returns (uint256) {
        return _showScheduleId.current();
    }

    function getShowSchedules(address walletId) public returns (uint256[] memory){
        return _showScheduleIdsByOwner[walletId];
    }
    
    function getShowSchedulesCount(address walletId) public returns (uint256){
        return _showScheduleIdsByOwner[walletId].length;
    }
}