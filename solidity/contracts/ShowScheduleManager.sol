// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ShowSchedule.sol";
import "./MyTicket.sol";
import "./IResellPolicy.sol";

contract ShowScheduleManager is IResellPolicy {
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
            uint256[] memory ticketClassMaxMintCounts,
            bool isResellAvailable, 
            uint8 resellRoyaltyRatePercent, 
            uint256 resellPriceLimit
        ) public {
        _showScheduleId.increment();

        uint256 newShowScheduleId = _showScheduleId.current();
        ResellPolicy memory resellPolicy = ResellPolicy({ 
                isAvailable: isResellAvailable, 
                royaltyRatePercent: resellRoyaltyRatePercent, 
                priceLimit: resellPriceLimit 
            });
        ShowSchedule newShowSchedule = new ShowSchedule(showId, stageName, startedAt, endedAt, maxMintCount, ticketClassNames, ticketClassPrices, ticketClassMaxMintCounts, resellPolicy, _currencyContractAddress, _ticketContractAddress);
        newShowSchedule.transferOwnership(msg.sender);

        _showSchedules[newShowScheduleId] = address(newShowSchedule);
        _showScheduleIdsByOwner[msg.sender].push(newShowScheduleId);
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

    function getCount() public view returns (uint256) {
        return _showScheduleId.current();
    }

    function getShowSchedules(address walletId) public view returns (uint256[] memory){
        return _showScheduleIdsByOwner[walletId];
    }
    
    function getShowSchedulesCount(address walletId) public view returns (uint256){
        return _showScheduleIdsByOwner[walletId].length;
    }

    function getShowId(uint256 showScheduleId) public view returns(uint64) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).getShowId();
    }

    function getStageName(uint256 showScheduleId) public view returns(string memory) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).getStageName();
    }

    function getStartedAt(uint256 showScheduleId) public view returns(uint256) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).getStartedAt();
    }

    function getEndedAt(uint256 showScheduleId) public view returns(uint256) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).getEndedAt();
    }

    function getMaxMintCount(uint256 showScheduleId) public view returns(uint256) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).getMaxMintCount();
    }

    function getResellPolicy(uint256 showScheduleId) public view returns (bool, uint8, uint256) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).getResellPolicy();
    }

    function getTicketClassCount(uint256 showScheduleId) public view returns(uint256) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).getTicketClassCount();
    }

    function getTicketClassName(uint256 showScheduleId, uint256 ticketClassId) public view returns(string memory) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).getTicketClassName(ticketClassId);
    }

    function getTicketClassPrice(uint256 showScheduleId, uint256 ticketClassId) public view returns(uint256) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).getTicketClassPrice(ticketClassId);
    }

    function getTicketClassMaxMintCount(uint256 showScheduleId, uint256 ticketClassId) public view returns(uint256) {
        address showScheduleAddr = _showSchedules[showScheduleId];
        return ShowSchedule(showScheduleAddr).getTicketClassMaxMintCount(ticketClassId);
    }
}