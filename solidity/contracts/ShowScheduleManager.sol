// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./MyTicket.sol";
import "./ShowSchedule.sol";

contract ShowScheduleManager is Ownable {
    address _adminId;
    address[] _showSchedules;

    constructor() {
        _adminId = msg.sender;
    }

    function create(uint256 showId, uint256 stageId, uint256 startedAt, uint256 endedAt, uint256 totalMintCount) public {
        ShowSchedule showSchedule = new ShowSchedule(showId, stageId, startedAt, endedAt, totalMintCount);
        _showSchedules.push(address(showSchedule));
    }

    function info(uint256 showScheduleIdx) public view returns(uint256, uint256, uint256, uint256, bool, uint256, uint256) {
        ShowSchedule showSchedule = ShowSchedule(_showSchedules[showScheduleIdx]);
        return showSchedule.info();
    }

    function cancel(uint256 showScheduleIdx) public onlyOwner {
        ShowSchedule showSchedule = ShowSchedule(_showSchedules[showScheduleIdx]);
        showSchedule.cancel();
    }

    function registerTicketBulk(uint256 showScheduleIdx, uint256[] memory ticketIds) public onlyOwner {
        ShowSchedule showSchedule = ShowSchedule(_showSchedules[showScheduleIdx]);
        showSchedule.registerTicketBulk(ticketIds);
    }

    function registerTicket(uint256 showScheduleIdx, uint256 ticketId) public onlyOwner {
        ShowSchedule showSchedule = ShowSchedule(_showSchedules[showScheduleIdx]);
        showSchedule.registerTicket(ticketId);
    }

    function revokeTicket(uint256 showScheduleIdx, uint256 ticketId) public onlyOwner {
        ShowSchedule showSchedule = ShowSchedule(_showSchedules[showScheduleIdx]);
        showSchedule.revokeTicket(ticketId);
    }

    function replaceTicket(uint256 showScheduleIdx, uint256 oldTicketId, uint256 newTicketId) public onlyOwner {
        ShowSchedule showSchedule = ShowSchedule(_showSchedules[showScheduleIdx]);
        showSchedule.replaceTicket(oldTicketId, newTicketId);
    }

    function allShowSchedules() public view returns (address[] memory) {
        return _showSchedules;
    }
}