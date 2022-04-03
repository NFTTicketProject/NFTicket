// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./TicketSale.sol";
import "./MyTicket.sol";
import "./ShowSchedule.sol";
import "./ShowScheduleManager.sol";

/*
* P2P 거래 정보를 관리하는 Management Contract
* 
* @author 김형준, 선민기
* @version 0.1
* @see None
*/

contract TicketSaleManager is Ownable {
    using Counters for Counters.Counter;

    event Withdrawal(address indexed to, uint256 amount);
    event SaleCreated(uint256 indexed saleId, address saleAddr, uint256 ticketId);
    
    // 거래 생성 시 마다 1씩 증가하는 ID
    Counters.Counter private _saleIds;
    // 생성된 거래 Contract의 주소
    mapping(uint256 => address) private _saleAddrs;
    // 생성된 거래 Contract의 소유자
    mapping(uint256 => address) private _saleOwners;
    // 해당 티켓의 현재 거래 ID
    mapping(uint256 => address) private _ticketSaleAddrs;
    // 어떤 주소가 생성한 거래 ID 목록
    mapping(address => uint256[]) private _saleIdsByWallet;
    // 어떤 티켓 ID(NFT)의 총 거래 횟수
    mapping(uint256 => Counters.Counter) private _saleCountOfTicket;

    // 기배포 된 공연 스케줄 정보 관리 계약 주소
    address private _showScheduleManagerContractAddress;
    // 기배포 된 ERC-20 토큰 계약 주소
    address private _currencyContractAddress;
    // 기배포 된 MyTicket(ERC-721) 토큰 계약 주소
    address private _ticketContractAddress;    

    /*
    * constructor
    * P2P 거래 정보 관리 객체를 생성
    * 
    * @ param address showScheduleManagerContractAddress 공연 스케줄 정보 관리 계약 주소
    * @ param address currencyContractAddress ERC-20 토큰 계약 주소
    * @ param address ticketContractAddress MyTicket(ERC-721) 토큰 계약 주소
    * @ return None
    * @ exception None
    */
    constructor(address showScheduleManagerContractAddress, address currencyContractAddress, address ticketContractAddress) {
        _showScheduleManagerContractAddress = showScheduleManagerContractAddress;
        _currencyContractAddress = currencyContractAddress;
        _ticketContractAddress = ticketContractAddress;
    }

    /*
    * create
    * 새로운 P2P 거래 정보를 가진 Contract를 생성
    * 
    * @ param uint256 ticketId 티켓 ID
    * @ param address seller 판매자 지갑 주소
    * @ param string description 공연 스케줄 설명
    * @ param uint256 price 판매 가격
    * @ param uint256 startedAt 공연 스케줄 시작 시간
    * @ param uint256 endedAt 공연 스케줄 종료 시간
    * @ return None
    * @ exception 리셀 정책 상 리셀 가능한 공연 스케줄이어야 함
    * @ exception 판매 가격이 리셀 정책 상 최고 가격보다 작아야 함
    */
    function create(uint256 ticketId, string memory description, uint256 price, uint256 startedAt, uint256 endedAt) public {
        _saleIds.increment();

        uint256 showScheduleId = MyTicket(_ticketContractAddress).getShowScheduleId(ticketId);
        address showScheduleAddr = ShowScheduleManager(_showScheduleManagerContractAddress).getShowSchedule(showScheduleId);
        (bool isAvailable, , uint256 priceLimit) = ShowSchedule(showScheduleAddr).getResellPolicy();
        require(isAvailable, "This ticket cannot be resell");
        require(price < priceLimit || priceLimit == 0, "You must not sell over the resell limit price");
        
        uint256 newTicketSaleId = _saleIds.current();
        TicketSale newTicketSale = new TicketSale(ticketId, msg.sender, description, price, startedAt, endedAt, _showScheduleManagerContractAddress, _currencyContractAddress, _ticketContractAddress);

        MyTicket(_ticketContractAddress).approve(address(newTicketSale), ticketId);

        _saleAddrs[newTicketSaleId] = address(newTicketSale);
        _saleOwners[newTicketSaleId] = msg.sender;
        _ticketSaleAddrs[ticketId] = address(newTicketSale);
        _saleIdsByWallet[msg.sender].push(newTicketSaleId);
        _saleCountOfTicket[ticketId].increment();

        emit SaleCreated(newTicketSaleId, address(newTicketSale), ticketId);
    }

    /*
    * withdrawRoyalty
    * 현재까지 모인 리셀 로열티를 관리자에게 송금
    *
    * @ param None
    * @ return None
    * @ exception msg.sender(요청자)가 관리자 주소이어야 함
    */
    function withdrawRoyalty() public payable onlyOwner {
        uint256 contractBalance = IERC20(_currencyContractAddress).balanceOf(address(this));
        IERC20(_currencyContractAddress).transfer(owner(), contractBalance);
        emit Withdrawal(owner(), contractBalance);
    }

    /*
    * ownerOf
    * 해당 거래의 판매자를 반환
    *
    * @ param uint256 saleId 거래 ID
    * @ return address 거래 소유 Wallet address
    * @ exception None
    */
    function ownerOf(uint256 saleId) public view returns(address) {
        return _saleOwners[saleId];
    }

    /*
    * getSale
    * 해당 거래의 Contract 주소를 반환
    *
    * @ param uint256 saleId 거래 ID
    * @ return address 거래 Contract address
    * @ exception None
    */
    function getSale(uint256 saleId) public view returns(address) {
        return _saleAddrs[saleId];
    }

    /*
    * getSaleOfTicket
    * 해당 티켓의 현재 Contract 주소를 반환
    *
    * @ param uint256 saleId 거래 ID
    * @ return address 거래 Contract address
    * @ exception None
    */
    function getSaleOfTicket(uint256 ticketId) public view returns(address) {
        return _ticketSaleAddrs[ticketId];
    }

    /*
    * getCount
    * 현재까지 등록된 모든 거래의 개수를 반환
    *
    * @ param None
    * @ return uint256 등록된 거래 개수
    * @ exception None
    */
    function getCount() public view returns (uint256) {
        return _saleIds.current();
    }

    /*
    * getSaleIdsByWallet
    * 해당 주소의 모든 거래 목록을 반환
    *
    * @ param address walletAddr 지갑 주소
    * @ return uint256[] 거래 ID 목록
    * @ exception None
    */
    function getSaleIdsByWallet(address walletAddr) public view returns(uint256[] memory) {
        return _saleIdsByWallet[walletAddr];
    }

    /*
    * getSaleCountOfTicket
    * 해당 티켓의 총 거래 횟수를 반환
    *
    * @ param uint256 ticketId 티켓 ID
    * @ return uint256 총 거래 횟수
    * @ exception None
    */
    function getSaleCountOfTicket(uint256 ticketId) public view returns(uint256) {
        return _saleCountOfTicket[ticketId].current();
    }
}