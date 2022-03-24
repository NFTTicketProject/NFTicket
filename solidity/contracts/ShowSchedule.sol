// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MyTicket.sol";
import "./TicketClass.sol";

// 공연 정보 생성과 연관된 티켓 발매 역할
contract ShowSchedule is Ownable {
    using Counters for Counters.Counter;

    uint64 private _showId;
    string private _stageName;
    uint256 private _startedAt;
    uint256 private _endedAt;
    uint256 private _confirmAt;
    bool private _isCancelled;
    Counters.Counter private _mintCount;
    mapping(uint256 => Counters.Counter) private _mintCountByClassId;
    uint256 private _maxMintCount;
    mapping(uint16 => mapping(uint16 => uint256)) private _ticketIdsBySeat;

    IERC20 private _currencyContract;
    MyTicket private _ticketContract;
    TicketClass private _ticketClassContract;
    
    constructor(
            uint64 showId,
            string memory stageName, 
            uint256 startedAt, 
            uint256 endedAt, 
            uint256 maxMintCount, 
            string[] memory ticketClassNames, 
            uint256[] memory ticketClassPrices, 
            uint256[] memory ticketClassMaxMintCounts,
            address currencyContractAddress,
            address ticketContractAddress
        ) public {
        require(ticketClassNames.length > 0);
        require(ticketClassNames.length == ticketClassPrices.length);
        require(ticketClassNames.length == ticketClassMaxMintCounts.length);

        _setShowId(showId);
        _setStageName(stageName);
        _setStartedAt(block.timestamp + startedAt);
        _setEndedAt(block.timestamp + endedAt);
        _setMaxMintCount(maxMintCount);

        _ticketClassContract = new TicketClass();
        for (uint256 i = 0; i < ticketClassNames.length; i++)
        {
            _ticketClassContract.create(ticketClassNames[i], ticketClassPrices[i], ticketClassMaxMintCounts[i]);
        }

        _isCancelled = false;
        _currencyContract = IERC20(currencyContractAddress);
        _ticketContract = MyTicket(ticketContractAddress);
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

    function TicketClassCount() public view returns(uint256) {
        return _ticketClassContract.TicketClassCount();
    }

    function TicketClassName(uint256 ticketClassId) public view returns(string memory) {
        return _ticketClassContract.TicketClassName(ticketClassId);
    }

    function TicketClassPrice(uint256 ticketClassId) public view returns(uint256) {
        return _ticketClassContract.TicketClassPrice(ticketClassId);
    }

    function TicketClassMaxMintCount(uint256 ticketClassId) public view returns(uint256) {
        return _ticketClassContract.TicketClassMaxMintCount(ticketClassId);
    }

    function cancel() public notEnded onlyOwner {
        _isCancelled = true;
    }

    // 티켓 등록
    function registerTicket(uint16 row, uint16 col, uint256 ticketId) public payable notFull notClassFull(ticketId) notCanceled notStarted {
        // 먼저 해당 자리가 비어있는지 확인
        require(_ticketIdsBySeat[row][col] == 0);
        
        uint256 classId = _ticketContract.ClassId(ticketId);
        uint256 classPrice = _ticketClassContract.TicketClassPrice(classId);

        // 등록자에게 충분한 잔고가 있는지 확인
        require(_currencyContract.balanceOf(msg.sender) >= classPrice);

        // 등록자에게서 금액만큼 토큰을 받음
        _currencyContract.transferFrom(msg.sender, address(this), classPrice);

        // 해당 자리에 티켓 ID를 등록
        _ticketIdsBySeat[row][col] = ticketId;

        // 전체 및 해당 등급의 발행 티켓 수를 증가
        _mintCount.increment();
        _mintCountByClassId[classId].increment();
    }

    // 티켓 등록 취소
    function revokeTicket(uint16 row, uint16 col) public payable notStarted {
         // 먼저 해당 자리에 해당 티켓이 등록되어 있는지 확인
        require(_ticketIdsBySeat[row][col] > 0);
        
        uint256 ticketId = _ticketIdsBySeat[row][col];
        uint256 classId = _ticketContract.ClassId(ticketId);
        uint256 classPrice = _ticketClassContract.TicketClassPrice(classId);

        // 티켓 주인인지 확인
        require(_ticketContract.ownerOf(ticketId) == msg.sender);

        // Contract에 충분한 잔고가 있는지 확인
        require(_currencyContract.balanceOf(address(this)) >= classPrice);
        
        // 등록자에게 금액만큼 토큰을 환불
        _currencyContract.transferFrom(address(this), msg.sender, classPrice);

        // 해당 자리에 티켓 ID를 등록 취소
        _ticketIdsBySeat[row][col] = 0;

        // 전체 및 해당 등급의 발행 티켓 수를 감소
        _mintCount.decrement();
        _mintCountByClassId[classId].decrement();
    }

    // 티켓 환불
    function refundTicket(uint16 row, uint16 col) public payable Canceled {
        revokeTicket(row, col);
    }

    // 모금액 회수
    function withdraw() public payable Ended onlyOwner {
        // 등록자에게 금액만큼 토큰을 전액 전송
        _currencyContract.transferFrom(address(this), msg.sender, _currencyContract.balanceOf(address(this)));
    }

    modifier notEmpty() {
        require(_mintCount.current() > 0, "You can't revoke the ticket yet");
        _;
    }

    modifier notFull() {
        require(_mintCount.current() < _maxMintCount, "You can't make a ticket at this schedule");
        _;
    }

    modifier notClassFull(uint256 ticketId) {
        uint256 classId = _ticketContract.ClassId(ticketId);
        uint256 classMaxMintCount = _ticketClassContract.TicketClassMaxMintCount(classId);

        // 먼저 해당 등급이 비어있는지 확인
        require(_mintCountByClassId[classId].current() < classMaxMintCount, "You can't make a ticket at this schedule");
        _;
    }

    modifier Started() {
        require(_startedAt < block.timestamp, "This schedule is not started yet");
        _;
    }

    modifier notStarted() {
        require(_startedAt >= block.timestamp, "This schedule is already started");
        _;
    }

    modifier Ended() {
        require(_endedAt < block.timestamp, "This schedule is not ended yet");
        _;
    }

    modifier notEnded() {
        require(_endedAt >= block.timestamp, "This schedule is already ended");
        _;
    }

    modifier Canceled() {
        require(_isCancelled, "This show is not cancelled");
        _;
    }

    modifier notCanceled() {
        require(!_isCancelled, "This show is cancelled");
        _;
    }
}