// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./MyTicket.sol";
import "./ShowSchedule.sol";
import "./ShowScheduleManager.sol";

/*
* P2P 거래 정보를 보존하는 Contract
* 
* @author 김형준, 선민기
* @version 0.1
* @see None
*/

contract TicketSale is Ownable, IERC721Receiver {
    using SafeMath for uint256;

    event Purchase(uint256 indexed ticketId, address seller, address buyer);
    event Withdrawal(address indexed to, uint256 amount);
    event Cancelled(uint256 indexed ticketId);
    event Ended(uint256 indexed ticketId);

    // 판매할 티켓 ID
    uint256 private _ticketId;
    // 판매자의 Wallet Address
    address private _seller;
    // 판매 글 설명
    string private _description;
    // 판매 가격
    uint256 private _price;
    // 취소 여부
    bool private _isCancelled;
    // 종료 여부
    bool private _isEnded;
    // 판매 시작 시간
    uint256 private _startedAt;
    // 판매 종료 시간
    uint256 private _endedAt;

    // 등록된 공연 스케줄 정보가 저장된 Management Contract 객체 (기배포된 CA를 통해 생성)
    ShowScheduleManager private _showScheduleManagerContract;
    // 어떤 ERC-20 Token도 화폐로 사용할 수 있도록 한 IERC20 Interface 객체 (기배포된 CA를 통해 생성)
    IERC20 private _currencyContract;
    // 발급된 티켓 정보가 저장된 NFT Contract 객체 (기배포된 CA를 통해 생성)
    MyTicket private _ticketContract;

    /*
    * constructor
    * P2P 거래 정보 객체를 생성
    * 
    * @ param uint256 ticketId 티켓 ID
    * @ param address seller 판매자 지갑 주소
    * @ param string description 공연 스케줄 설명
    * @ param uint256 price 판매 가격
    * @ param uint256 startedAt 공연 스케줄 시작 시간
    * @ param uint256 endedAt 공연 스케줄 종료 시간
    * @ param address showScheduleManagerContractAddress 공연 스케줄 정보 관리 계약 주소
    * @ param address currencyContractAddress ERC-20 토큰 계약 주소
    * @ param address ticketContractAddress MyTicket(ERC-721) 토큰 계약 주소
    * @ return None
    * @ exception 판매 가격은 0 이상
    */
    constructor(
        uint256 ticketId,
        address seller,
        string memory description,
        uint256 price,
        uint256 startedAt,
        uint256 endedAt,
        address showScheduleManagerContractAddress,
        address currencyContractAddress,
        address ticketContractAddress
    ) {
        require(price > 0);
        _setTicketId(ticketId);
        _setSeller(seller);
        _setDescription(description);
        _setPrice(price);
        _setStartedAt(block.timestamp + startedAt);
        _setEndedAt(block.timestamp + endedAt);
        _showScheduleManagerContract = ShowScheduleManager(showScheduleManagerContractAddress);
        _currencyContract = IERC20(currencyContractAddress);
        _ticketContract = MyTicket(ticketContractAddress);
    }
    /*
    * end
    * 판매 종료 여부를 '종료' 로 변경
    * 종료된 판매는 다시 활성화 불가능 (재생성 필요)
    *
    * @ param None
    * @ return None
    * @ exception None
    */
    function end() private {
        _isEnded = true;
        emit Ended(_ticketId);
    }

    /*
    * cancel
    * 판매 취소 여부를 '취소' 로 변경
    * 취소된 판매는 다시 활성화 불가능 (재생성 필요)
    *
    * @ param None
    * @ return None
    * @ exception None
    */
    function cancel() public onlySeller {
        _isCancelled = true;
        emit Cancelled(_ticketId);
    }

    /*
    * balanceOf
    * 현재 계약에 보관된 ERC-20 토큰 잔고를 반환
    *
    * @ param None
    * @ return uint256 현재 계약에 보관된 ERC-20 토큰 잔고
    * @ exception None
    */
    function balanceOf() public view returns(uint256) {
        return _currencyContract.balanceOf(address(this));
    }

    /*
    * purchase
    * 판매 조건을 만족할 경우,
    * 판매자의 지갑으로부터 구매자의 지갑으로 등록된 MyTicket(ERC-721) 토큰을 전송
    * 구매자의 지갑으로부터 계약 지갑으로 판매 가격 만큼의 ERC-20 토큰을 전송
    *
    * @ param None
    * @ return None
    * @ exception 현재 활성 상태(미취소, 미완료, 판매시간 내)의 판매 이어야 함
    * @ exception 판매자가 현재 티켓 주인이어야 함
    * @ exception 구매자가 현재 판매 가격 이상의 잔고를 가지고 있어야 함
    */
    function purchase() public payable ActiveSale {
        uint256 showScheduleId = _ticketContract.getShowScheduleId(_ticketId);
        address showScheduleAddr = _showScheduleManagerContract.getShowSchedule(showScheduleId);
        uint256 classId = _ticketContract.getClassId(_ticketId);
        uint256 classPrice = ShowSchedule(showScheduleAddr).getTicketClassPrice(classId);

        // 판매자가 티켓 주인인가 확인
        require(_ticketContract.ownerOf(_ticketId) == _seller, "seller is not owner");

        // 구매자에게 현재 잔고가 있는가 확인
        require(_currencyContract.balanceOf(msg.sender) >= classPrice, "balance is exhausted");

        // 판매자에게서 구매자에게 티켓 전송
        _ticketContract.safeTransferFrom(_seller, msg.sender, _ticketId);

        // 구매자에게서 CA로 토큰 지불
        _currencyContract.transferFrom(msg.sender, address(this), classPrice);

        emit Purchase(_ticketId, _seller, msg.sender);

        // 판매 종료 처리
        end();
    }

    /*
    * withdraw
    * 판매 종료 후,
    * 계약 지갑으로부터 판매자의 지갑으로 판매 가격에서 로열티를 제외한 만큼의 ERC-20 토큰을 전송
    * 계약 지갑으로부터 판매 관리 계약 지갑으로 로열티 만큼의 ERC-20 토큰을 전송
    *
    * @ param None
    * @ return None
    * @ exception 현재 종료된 거래이어야 함
    * @ exception msg.sender(호출자)가 판매자이어야 함
    */
    function withdraw() public payable EndedSale onlySeller {
        uint256 showScheduleId = _ticketContract.getShowScheduleId(_ticketId);
        address showScheduleAddr = _showScheduleManagerContract.getShowSchedule(showScheduleId);
        (, uint8 royaltyRatePercent, ) = ShowSchedule(showScheduleAddr).getResellPolicy();

        uint256 contractBalance = _currencyContract.balanceOf(address(this));
        uint256 ownerAmount = contractBalance.mul(royaltyRatePercent).div(100);
        uint256 sellerAmount = contractBalance.sub(ownerAmount);
        
        // 판매자에게 로열티를 제외한 만큼의 토큰 전송
        _currencyContract.transfer(_seller, sellerAmount);
        
        // 계약주소의 잔고 확인
        uint256 contractBalanceAfterTransfer = _currencyContract.balanceOf(address(this));
        // 계약주소로부터 계약 소유자(판매 관리 계약 주소)로 로열티를 전송
        _currencyContract.transfer(owner(), contractBalanceAfterTransfer);

        emit Withdrawal(_seller, sellerAmount);
    }

    /*
    * getStartTimeLeft
    * 판매 시작까지 남은 시간을 반환
    *
    * @ param None
    * @ return uint256 판매 시작까지 남은 시간
    * @ exception None
    */
    function getStartTimeLeft() public view returns(uint256) {
        require(_startedAt > block.timestamp, "This sale is already started");
        return _startedAt - block.timestamp;
    }

    /*
    * getEndTimeLeft
    * 판매 종료까지 남은 시간을 반환
    *
    * @ param None
    * @ return uint256 판매 종료까지 남은 시간
    * @ exception None
    */
    function getEndTimeLeft() public view returns(uint256) {
        require(_endedAt > block.timestamp, "This sale is already ended");
        return _endedAt - block.timestamp;
    }

    // ERC-721 safeTransferFrom 대응을 위한 인터페이스 구현
    function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes memory _data) external pure returns(bytes4)
    {
        return this.onERC721Received.selector;
    }

    function _setTicketId(uint256 ticketId) private
    {
        _ticketId = ticketId;
    }

    function _setSeller(address seller) private
    {
        _seller = seller;
    }

    function _setDescription(string memory description) private
    {
        _description = description;
    }

    function _setPrice(uint256 price) private
    {
        _price = price;
    }

    function _setStartedAt(uint256 startedAt) private
    {
        _startedAt = startedAt;
    }

    function _setEndedAt(uint256 endedAt) private
    {
        _endedAt = endedAt;
    }

    function getTicketId() public view returns (uint256 ticketId) 
    {
        return _ticketId;
    }

    function getSeller() public view returns (address seller) 
    {
        return _seller;
    }

    function getDescription() public view returns (string memory description) 
    {
        return _description;
    }

    function getPrice() public view returns (uint256 price) 
    {
        return _price;
    }

    function getStartedAt() public view returns (uint256 startedAt) 
    {
        return _startedAt;
    }

    function getEndedAt() public view returns (uint256 endedAt) 
    {
        return _endedAt;
    }

    function isCancelled() public view returns (bool) {
        return _isCancelled;
    }

    function isEnded() public view returns (bool) {
        return _isEnded;
    }

    modifier onlySeller() {
        require(msg.sender == _seller);
        _;
    }

    modifier ActiveSale() {
        require(_startedAt < block.timestamp, "This sale is not started yet");
        require(_endedAt > block.timestamp, "This sale is already ended");
        require(!_isCancelled);
        require(!_isEnded);
        _;
    }

    modifier EndedSale() {
        require(_isEnded);
        _;
    }
}
