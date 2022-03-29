// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./MyTicket.sol";
import "./IResellPolicy.sol";
import "./ITicketClass.sol";

/*
* 공연 스케줄 정보를 보존하고 티켓을 발매하는 Contract
* 
* @author 김형준, 선민기
* @version 0.1
* @see None
*/

contract ShowSchedule is Ownable, IResellPolicy, ITicketClass {
    using Counters for Counters.Counter;

    // 공연 관리자(기획자) 주소
    address private _admin;
    // 공연 정보(Backend) ID
    uint64 private _showId;
    // 공연장 이름
    string private _stageName;
    // 공연 스케줄 시작 시간
    uint256 private _startedAt;
    // 공연 스케줄 종료 시간
    uint256 private _endedAt;
    // 공연 스케줄 취소 여부
    bool private _isCancelled;
    // 공연 스케줄에 발급된 티켓 개수
    Counters.Counter private _mintCount;
    // 공연 스케줄에 발급된 좌석 등급별 티켓 개수
    mapping(uint256 => Counters.Counter) private _mintCountByClassId;
    // 공연 스케줄에 발급될 수 있는 최대 티켓 개수
    uint256 private _maxMintCount;
    // 좌석에 등록된 티켓 ID (좌석 등급 => 인덱스 => 좌석 ID)
    mapping(uint256 => mapping(uint256 => uint256)) private _ticketIdsBySeat;
    // 공연 스케줄에 적용 될 리셀 정책 (Contract 마다 생성)
    ResellPolicy private _resellPolicy;
    // 좌석 등급에 관한 정보 (Contract마다 생성)
    TicketClassInfo[] private _ticketClasses;

    // 어떤 ERC-20 Token도 화폐로 사용할 수 있도록 한 IERC20 Interface 객체 (기배포된 CA를 통해 생성)
    IERC20 private _currencyContract;
    // 발급된 티켓 정보가 저장된 NFT Contract 객체 (기배포된 CA를 통해 생성)
    MyTicket private _ticketContract;
    
    /*
    * constructor
    * 공연 스케줄 객체를 생성
    * 
    * @ param address admin 공연 관리자(기획자)
    * @ param uint64 showId Backend에서 발급되는 공연 정보에 관한 ID
    * @ param string stageName 공연장 이름
    * @ param uint256 startedAt 공연 스케줄 시작 시간
    * @ param uint256 endedAt 공연 스케줄 종료 시간
    * @ param string[] ticketClassNames 좌석 등급 이름 배열
    * @ param uint256[] ticketClassPrices 좌석 등급 가격 배열
    * @ param uint256[] ticketClassMaxMintCounts 좌석 등급별 최대 발급 티켓 수 배열
    * @ param ResellPolicy resellPolicy 티켓 리셀 정책
    * @ param address currencyContractAddress ERC-20 토큰 계약 주소
    * @ param address ticketContractAddress MyTicket(ERC-721) 토큰 계약 주소
    * @ return None
    * @ exception None
    */
    constructor(
            address admin,
            uint64 showId,
            string memory stageName, 
            uint256 startedAt, 
            uint256 endedAt, 
            uint256 maxMintCount, 
            TicketClassInfo[] memory ticketClasses,
            ResellPolicy memory resellPolicy,
            address currencyContractAddress,
            address ticketContractAddress
        ) public {

        _setAdmin(admin);
        _setShowId(showId);
        _setStageName(stageName);
        _setStartedAt(block.timestamp + startedAt);
        _setEndedAt(block.timestamp + endedAt);
        _setMaxMintCount(maxMintCount);
        _setResellPolicy(resellPolicy);
        _setTicketClasses(ticketClasses);

        _isCancelled = false;
        _currencyContract = IERC20(currencyContractAddress);
        _ticketContract = MyTicket(ticketContractAddress);
    }

    /*
    * cancel
    * 공연 스케줄 취소 여부를 '취소'로 변경
    * 취소된 공연은 다시 활성화 불가능 (재생성 필요)
    *
    * @ param None
    * @ return None
    * @ exception 공연이 종료되기 전 이어야 함 (공연 종료 시간 > 현재 시간)
    * @ exception 공연 관리자(기획자)만 호출할 수 있음
    */
    function cancel() public notEnded onlyAdmin {
        _isCancelled = true;
    }

    /*
    * registerTicket
    * 임의의 classId A, 임의의 seatIndex B, 임의의 ticketId X에 대해
    * 요청자는 등록 비용을 지불하고 A등급 B번째 좌석에 티켓 ID X를 등록
    * Contract의 발급 티켓 수와 등급별 발급 티켓 수가 1씩 증가
    *
    * @ param uint256 classId 등급 ID
    * @ param uint256 seatIndex 좌석 Index
    * @ param uint256 ticketId 티켓 ID
    * @ return None
    * @ exception 티켓 발급 개수가 최대 발급 개수를 넘지 않아야함
    * @ exception 등급별 티켓 발급 개수가 등급별 최대 발급 개수를 넘지 않아야함
    * @ exception 공연이 취소 상태가 아니어야 함
    * @ exception 공연이 시작되기 전 이어야 함 (공연 시작 시간 > 현재 시간)
    * @ exception A등급 B번째 좌석이 비어 있어야 함
    * @ exception 티켓의 classId와 등록할 classId가 일치해야 함
    * @ exception msg.sender(요청자)에게 등록 비용 이상의 잔고가 있어야 함    
    */
    function registerTicket(uint256 classId, uint256 seatIndex, uint256 ticketId) public payable notFull notClassFull(ticketId) notCanceled notStarted {
        // 먼저 해당 자리가 비어있는지 확인
        require(_ticketIdsBySeat[classId][seatIndex] == 0, "This seat is already registered");
        
        // 티켓의 class와 등록할 class가 일치하는지 확인
        require(classId == _ticketContract.getClassId(ticketId), "class id doesn't match");

        // 해당 클래스의 등록 가격 가져오기
        uint256 classPrice = getTicketClassPrice(classId);

        // 등록자에게 충분한 잔고가 있는지 확인
        require(_currencyContract.balanceOf(msg.sender) >= classPrice, "Not enough balance");

        // 등록자에게서 금액만큼 토큰을 받음
        _currencyContract.transferFrom(msg.sender, address(this), classPrice);

        // 해당 자리에 티켓 ID를 등록
        _ticketIdsBySeat[classId][seatIndex] = ticketId;

        // 전체 및 해당 등급의 발행 티켓 수를 증가
        _mintCount.increment();
        _mintCountByClassId[classId].increment();
    }

    /*
    * revokeTicket
    * 임의의 classId A와 임의의 seatIndex B에 대해
    * A등급 B번째 좌석에 등록된 티켓 ID X의 소유자가 요청시 등록을 취소하고 등록 비용을 반환
    * Contract의 발급 티켓 수와 등급별 발급 티켓 수가 1씩 감소
    * 
    * @ param uint256 classId 등급 ID
    * @ param uint256 seatIndex 좌석 Index
    * @ return None
    * @ exception 공연이 시작되기 전 이어야 함 (공연 시작 시간 > 현재 시간)
    */
    function revokeTicket(uint256 classId, uint256 seatIndex) public payable notStarted {
         // 먼저 해당 자리에 해당 티켓이 등록되어 있는지 확인
        require(_ticketIdsBySeat[classId][seatIndex] > 0);

        // 해당 자리에 등록된 티켓 ID 가져오기
        uint256 ticketId = _ticketIdsBySeat[classId][seatIndex];

        // 티켓의 class와 취소할 class가 일치하는지 확인
        require(classId == _ticketContract.getClassId(ticketId));

        // 해당 클래스의 등록 가격 가져오기
        uint256 classPrice = getTicketClassPrice(classId);

        // 티켓 주인인지 확인
        require(_ticketContract.ownerOf(ticketId) == msg.sender);

        // Contract에 충분한 잔고가 있는지 확인
        require(_currencyContract.balanceOf(address(this)) >= classPrice);
        
        // 등록자에게 금액만큼 토큰을 환불
        _currencyContract.transfer(msg.sender, classPrice);

        // 해당 자리에 티켓 ID를 등록 취소
        _ticketIdsBySeat[classId][seatIndex] = 0;

        // 전체 및 해당 등급의 발행 티켓 수를 감소
        _mintCount.decrement();
        _mintCountByClassId[classId].decrement();
    }

    /*
    * refundTicket
    * 임의의 classId A와 임의의 seatIndex B에 대해
    * A등급 B번째 좌석에 등록된 티켓 ID X의 소유자가 요청시 등록을 취소하고 등록 비용을 반환
    * Contract의 발급 티켓 수와 등급별 발급 티켓 수가 1씩 감소
    *
    * payable이 private을 지원하지 않네요
    *
    * @ param uint256 classId 등급 ID
    * @ param uint256 seatIndex 좌석 Index
    * @ return None
    * @ exception 공연이 취소 상태이어야 함
    */
    function refundTicket(uint256 classId, uint256 seatIndex) public payable Canceled {
         // 먼저 해당 자리에 해당 티켓이 등록되어 있는지 확인
        require(_ticketIdsBySeat[classId][seatIndex] > 0);

        // 해당 자리에 등록된 티켓 ID 가져오기
        uint256 ticketId = _ticketIdsBySeat[classId][seatIndex];

        // 티켓의 class와 취소할 class가 일치하는지 확인
        require(classId == _ticketContract.getClassId(ticketId));

        // 해당 클래스의 등록 가격 가져오기
        uint256 classPrice = getTicketClassPrice(classId);

        // 티켓 주인인지 확인
        require(_ticketContract.ownerOf(ticketId) == msg.sender);

        // Contract에 충분한 잔고가 있는지 확인
        require(_currencyContract.balanceOf(address(this)) >= classPrice);
        
        // 등록자에게 금액만큼 토큰을 환불
        _currencyContract.transfer(msg.sender, classPrice);

        // 해당 자리에 티켓 ID를 등록 취소
        _ticketIdsBySeat[classId][seatIndex] = 0;

        // 전체 및 해당 등급의 발행 티켓 수를 감소
        _mintCount.decrement();
        _mintCountByClassId[classId].decrement();
    }

    /*
    * withdraw
    * 공연 스케줄 Contract에 보관된 
    * 손님들이 지불한 등록 비용을 공연 관리자에게 전송
    *
    * @ param None
    * @ return None
    * @ exception 공연이 종료된 후 이어야 함 (공연 종료 시간 < 현재 시간)
    * @ exception 공연 관리자(기획자)만 호출할 수 있음
    */
    function withdraw() public payable Ended onlyAdmin {
        // Contract가 보유중인 토큰 잔고 확인
        uint256 contractBalance = _currencyContract.balanceOf(address(this));

        // 공연 관리자에게 금액만큼 토큰을 Contract의 잔액를 전액 전송
        _currencyContract.transfer(_admin, contractBalance);
    }

    function _setAdmin(address admin) private onlyOwner {
        _admin = admin;
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

    function _setResellPolicy(ResellPolicy memory resellPolicy) private onlyOwner {
        _resellPolicy = resellPolicy;
    }

    function _setTicketClasses(TicketClassInfo[] memory ticketClasses) private onlyOwner {
        for (uint256 i = 0; i < ticketClasses.length; i++)
        {
            _ticketClasses.push(ticketClasses[i]);
        }
    }

    function getShowId() public view returns(uint64) {
        return _showId;
    }

    function getStageName() public view returns(string memory) {
        return _stageName;
    }

    function getStartedAt() public view returns(uint256) {
        return _startedAt;
    }

    function getEndedAt() public view returns(uint256) {
        return _endedAt;
    }

    function getMaxMintCount() public view returns(uint256) {
        return _maxMintCount;
    }

    function getResellPolicy() public view returns (bool, uint8, uint256) {
        return (_resellPolicy.isAvailable, _resellPolicy.royaltyRatePercent, _resellPolicy.priceLimit);
    }

    function getTicketClassCount() public view returns(uint256) {
        return _ticketClasses.length;
    }

    function getTicketClassName(uint256 ticketClassId) public view returns(string memory) {
        return _ticketClasses[ticketClassId].name;
    }

    function getTicketClassPrice(uint256 ticketClassId) public view returns(uint256) {
        return _ticketClasses[ticketClassId].price;
    }

    function getTicketClassMaxMintCount(uint256 ticketClassId) public view returns(uint256) {
        return _ticketClasses[ticketClassId].maxMintCount;
    }

    modifier onlyAdmin() {
        require(msg.sender == _admin, "You're not admin");
        _;
    }

    modifier notEmpty() {
        require(_mintCount.current() > 0, "There is no registered ticket");
        _;
    }

    modifier notFull() {
        require(_mintCount.current() < _maxMintCount, "You must not exceed the max ticket count");
        _;
    }

    modifier notClassFull(uint256 ticketId) {
        uint256 classId = _ticketContract.getClassId(ticketId);
        uint256 classMaxMintCount = getTicketClassMaxMintCount(classId);

        // 먼저 해당 등급이 비어있는지 확인
        require(_mintCountByClassId[classId].current() < classMaxMintCount, "You must not exceed the max ticket count of class");
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
        require(_isCancelled, "This schedule is not cancelled");
        _;
    }

    modifier notCanceled() {
        require(!_isCancelled, "This schedule is cancelled");
        _;
    }
}