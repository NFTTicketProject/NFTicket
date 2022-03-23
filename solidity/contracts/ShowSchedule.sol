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

    address private _myTicketContractAddress;
    
    constructor(
            uint64 showId, 
            string memory stageName, 
            uint256 startedAt, 
            uint256 endedAt, 
            uint256 maxMintCount, 
            uint64[] memory classIds, 
            uint256[] memory maxMintCountByClassId,
            address myTicketContractAddress
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
        _myTicketContractAddress = myTicketContractAddress;
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

    // function info() public view returns(uint64, string memory, int256, int256, uint256) {
    //     return (_showId, _stageName, int256(_startedAt) - int256(block.timestamp), int256(_endedAt) - int256(block.timestamp), _maxMintCount);
    // }

    // // 티켓 여러장 등록시
    // function registerTicketBulk(uint16[] memory rows, uint16 memory cols, uint256[] memory ticketIds, uint64[] memory classes) public onlyOwner notFull notCanceled emptyTickets {
    //     for (uint i = 0; i < ticketIds.length; i++)
    //     {
    //         _ticketIdsBySeat[Seat({row: rows[i], column: cols[i]})] = ticketIds[i];
    //         _mintCount.increment();
    //         _mintCountByClass[classes[i]].increment();
    //     }
    // }

    // 1. 프론트에서 고객으로부터 백엔드로 발행 요청 전달 받음
    // 2. 백엔드 지갑에서 MyTicket에 접근해 티켓을 발급
    // 3. 백엔드에서 발급한 티켓을 거래글로 등록해서 프론트로 전달
    // 4. 고객이 거래글에 purchase 요청을 보냄 (Metamask 뜸)
    // 5. 백엔드로부터 고객에게 발급된 티켓을 양도
    // 6. 백엔드는 receipt 이벤트를 listen 하다가 성공하면 ShowSchedule로 접근해 발급한 티켓을 registerTicket
    // 7. 실패하면 nothing

    // 공연기획자가 CA에 돈을 지불하면서 좌석에 맞게 등록
    function registerTicket(uint16 row, uint16 col, uint256 ticketId) public payable onlyOwner notFull notCanceled {
        // 먼저 해당 자리가 비어있는지 확인
        require(_ticketIdsBySeat[row][col] == 0);
        
        uint256 issuePrice = MyTicket(_myTicketContractAddress).IssuePrice(ticketId);
        uint256 classId = MyTicket(_myTicketContractAddress).ClassId(ticketId);

        // 티켓 발행 가격만큼 공연 기획자가 CA에 지불한다
        //require(issuePrice == msg.value);

        // 해당 자리에 티켓 ID를 등록
        _ticketIdsBySeat[row][col] = ticketId;

        // 전체 및 해당 등급의 발행 티켓 수를 증가
        _mintCount.increment();
        _mintCountByClassId[classId].increment();

        // 티켓 발행 요청 ...
    }

    // 티켓 등록 취소
    function revokeTicket(uint16 row, uint16 col) public onlyOwner {
        
    }

    // 티켓 자리 바꿈
    function replaceTicket(uint256 oldTicketId, uint256 newTicketId) public onlyOwner {
        
        
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