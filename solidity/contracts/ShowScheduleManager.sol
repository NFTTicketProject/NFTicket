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
    address private _myTicketContractAddress;
    
    constructor(address myTicketContractAddress) {
        _myTicketContractAddress = myTicketContractAddress;
    }

    function create(
            uint64 showId, 
            string memory stageName, 
            uint256 startedAt, 
            uint256 endedAt, 
            uint256 maxMintCount, 
            uint64[] memory classes, 
            uint256[] memory maxMintCountByClass
        ) public {
        _showScheduleId.increment();

        uint256 newShowScheduleId = _showScheduleId.current();
        ShowSchedule newShowSchedule = new ShowSchedule(showId, stageName, startedAt, endedAt, maxMintCount, classes, maxMintCountByClass, _myTicketContractAddress);
        _showSchedules[newShowScheduleId] = address(newShowSchedule);
        _showScheduleIdsByOwner[msg.sender].push(newShowScheduleId);
    }

    function cancel(uint256 showScheduleId) public {
        ShowSchedule(_showSchedules[showScheduleId]).cancel();
    }

    function registerTicket(uint256 showScheduleId, uint16 row, uint16 col, uint256 ticketId) public payable {
        ShowSchedule(_showSchedules[showScheduleId]).registerTicket(row, col, ticketId);
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

    //new!
    function getAddressOfShowSchedule(uint256 showScheduleId) public returns (address) {
        return _showSchedules[showScheduleId];
    }
}