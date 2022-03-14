// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ShowSchedule is Ownable {
    using Counters for Counters.Counter;

    uint256 _adminId;
    uint256 _showId;
    uint256 _stageId;
    uint256 _startedAt;
    uint256 _endedAt;

    bool _isCancelled = false;
    uint256 _totalMintCount = 0;

    Counters.Counter _mintCount;
    mapping(uint256 => bool) _validTicketIds;

    constructor(uint256 showId, uint256 stageId, uint256 startedAt, uint256 endedAt, uint256 totalMintCount) public {
        owner();
        _showId = showId;
        _stageId = stageId;
        _startedAt = startedAt;
        _endedAt = endedAt;
        _totalMintCount = totalMintCount;
    }

    function cancel() public onlyOwner {
        _isCancelled = true;
    }

    function registerTicketBulk(uint256[] memory ticketIds) public onlyOwner notFull notCanceled emptyTickets {
        for (uint i = 0; i < ticketIds.length; i++)
        {
            _validTicketIds[ticketIds[i]] = true;
            _mintCount.increment();
        }
    }

    function registerTicket(uint256 ticketId) public onlyOwner notFull notCanceled onlyUnregisteredTicket(ticketId) {
        require(!_validTicketIds[ticketId], "This ticket is already registered");
        _validTicketIds[ticketId] = true;
        _mintCount.increment();
    }

    function revokeTicket(uint256 ticketId) public onlyOwner {
        require(_validTicketIds[ticketId], "Ticket needs to be registered");
        _validTicketIds[ticketId] = false;
        _mintCount.decrement();
    }

    function replaceTicket(uint256 oldTicketId, uint256 newTicketId) public onlyOwner {
        require(_validTicketIds[oldTicketId], "Ticket needs to be registered");
        _validTicketIds[oldTicketId] = false;
        _validTicketIds[newTicketId] = true;
    }

    modifier notFull() {
        require(_mintCount.current() < _totalMintCount, "You can't make a ticket at this schedule");
        _;
    }

    modifier notCanceled() {
        require(!_isCancelled, "This show is cancelled");
        _;
    }

    modifier onlyUnregisteredTicket(uint256 ticketId) {
        require(!_validTicketIds[ticketId], "Ticket needs to be registered");
        _;
    }

    modifier emptyTickets() {
        require(_mintCount.current() == 0, "Ticket is already minted");
        _;
    }
}