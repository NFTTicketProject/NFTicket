// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MyTicket.sol";

// 공연 정보 생성과 연관된 티켓 발매 역할
contract ShowSchedule is Ownable {
    using Counters for Counters.Counter;

    uint64 private _showId;
    string private _stageName;
    uint256 private _startedAt;
    uint256 private _endedAt;
    bool private _isCancelled;
    Counters.Counter private _mintCount;
    mapping(uint256 => Counters.Counter) private _mintCountByClassId;
    uint256 private _maxMintCount;
    mapping(uint64 => uint256) private _maxMintCountByClassId;
    mapping(uint16 => mapping(uint16 => uint256)) private _ticketIdsBySeat;

    address private _currencyContractAddress;
    address private _ticketContractAddress;
    
    constructor(
            uint64 showId, 
            string memory stageName, 
            uint256 startedAt, 
            uint256 endedAt, 
            uint256 maxMintCount, 
            uint64[] memory classIds, 
            uint256[] memory maxMintCountByClassId,
            address currencyContractAddress,
            address ticketContractAddress
        ) public {
        require(classIds.length == maxMintCountByClassId.length);
        _setShowId(showId);
        _setStageName(stageName);
        _setStartedAt(startedAt);
        _setEndedAt(endedAt);
        _setMaxMintCount(maxMintCount);

        for (uint256 i = 0; i < classIds.length; i++)
        {
            _setMaxMintCountByClassId(classIds[i], maxMintCountByClassId[i]);
        }

        _isCancelled = false;
        _currencyContractAddress = currencyContractAddress;
        _ticketContractAddress = ticketContractAddress;
    }

    function _setShowId(uint64 showId) private onlyOwner {
        _showId = showId;
    }

    function _setStageName(string memory stageName) private onlyOwner {
        _stageName = stageName;
    }

    function _setStartedAt(uint256 startedAt) private onlyOwner {
        _startedAt = startedAt;
    }

    function _setEndedAt(uint256 endedAt) private onlyOwner {
        _endedAt = endedAt;
    }

    function _setMaxMintCount(uint256 maxMintCount) private onlyOwner {
        _maxMintCount = maxMintCount;
    }

    function _setMaxMintCountByClassId(uint64 classId, uint256 maxMintCount) private onlyOwner {
        _maxMintCountByClassId[classId] = maxMintCount;
    }

    function cancel() public onlyOwner {
        _isCancelled = true;
    }

    function registerTicket(uint16 row, uint16 col, uint256 ticketId) public payable onlyOwner notFull notCanceled {
        // 먼저 해당 자리가 비어있는지 확인
        require(_ticketIdsBySeat[row][col] == 0);
        
        uint256 issuePrice = MyTicket(_ticketContractAddress).IssuePrice(ticketId);
        uint256 classId = MyTicket(_ticketContractAddress).ClassId(ticketId);

        // 해당 자리에 티켓 ID를 등록
        _ticketIdsBySeat[row][col] = ticketId;

        // 전체 및 해당 등급의 발행 티켓 수를 증가
        _mintCount.increment();
        _mintCountByClassId[classId].increment();
    }

    // 티켓 등록 취소
    function revokeTicket(uint16 row, uint16 col, uint256 ticketId) public onlyOwner {
         // 먼저 해당 자리에 해당 티켓이 등록되어 있는지 확인
        require(_ticketIdsBySeat[row][col] == ticketId);
        
        uint256 issuePrice = MyTicket(_ticketContractAddress).IssuePrice(ticketId);
        uint256 classId = MyTicket(_ticketContractAddress).ClassId(ticketId);

        // 해당 자리에 티켓 ID를 취소
        _ticketIdsBySeat[row][col] = 0;

        // 전체 및 해당 등급의 발행 티켓 수를 증가
        _mintCount.decrement();
        _mintCountByClassId[classId].decrement();
    }

    modifier notFull() {
        require(_mintCount.current() < _maxMintCount, "You can't make a ticket at this schedule");
        _;
    }

    modifier notCanceled() {
        require(!_isCancelled, "This show is cancelled");
        _;
    }
}