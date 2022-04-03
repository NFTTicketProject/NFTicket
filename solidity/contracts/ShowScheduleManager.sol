// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ShowSchedule.sol";
import "./MyTicket.sol";
import "./IResellPolicy.sol";
import "./ITicketClass.sol";

/*
* 공연 스케줄 정보들을 관리하고 공연 스케줄을 생성하는 Management Contract
* 
* @author 김형준, 선민기
* @version 0.1
* @see None
*/

contract ShowScheduleManager is IResellPolicy, ITicketClass {
    using Counters for Counters.Counter;

    event ShowScheduleCreated(uint256 indexed showScheduleId, address showScheduleAddr);

    // 공연 스케줄 ID
    Counters.Counter private _showScheduleId;
    // 생성된 공연 스케줄 Contract의 주소
    mapping(uint256 => address) private _showScheduleAddrs;
    // 생성된 공연 스케줄 Contract의 소유자(공연 관리자, 기획자)
    mapping(uint256 => address) private _showScheduleOwners;
    // 어떤 주소가 생성한 공연 스케줄 ID 목록
    mapping(address => uint256[]) private _showScheduleIdsByOwner;
    // 기배포 된 ERC-20 토큰 계약 주소
    address private _currencyContractAddress;
    // 기배포 된 MyTicket(ERC-721) 토큰 계약 주소
    address private _ticketContractAddress;    
    
    /*
    * constructor
    * 공연 스케줄 관리 객체를 생성
    * 
    * @ param address currencyContractAddress ERC-20 토큰 계약 주소
    * @ param address ticketContractAddress MyTicket(ERC-721) 토큰 계약 주소
    * @ return None
    * @ exception None
    */
    constructor(address currencyContractAddress, address ticketContractAddress) {
        _currencyContractAddress = currencyContractAddress;
        _ticketContractAddress = ticketContractAddress;
    }

    /*
    * create
    * 새로운 공연 스케줄 정보를 가진 Contract를 생성
    *
    * @ param uint64 showId Backend에서 발급되는 공연 정보에 관한 ID
    * @ param string stageName 공연장 이름
    * @ param uint256 startedAt 공연 스케줄 시작 시간
    * @ param uint256 endedAt 공연 스케줄 종료 시간
    * @ param string[] ticketClassNames 좌석 등급 이름 배열
    * @ param uint256[] ticketClassPrices 좌석 등급 가격 배열
    * @ param uint256[] ticketClassMaxMintCounts 좌석 등급별 최대 발급 티켓 수 배열
    * @ param bool isResellAvailable 리셀 가능 여부
    * @ param uint8 resellRoyaltyRatePercent 리셀 로열티 비율 퍼센트 (부동소수점 미지원)
    * @ param uint256 resellPriceLimit 리셀 최대 가격 제한
    * @ param address currencyContractAddress ERC-20 토큰 계약 주소
    * @ param address ticketContractAddress MyTicket(ERC-721) 토큰 계약 주소
    * @ return None
    * @ exception 좌석 등급 이름 배열 길이가 0보다 커야함
    * @ exception 좌석 등급 가격 배열 길이가 0보다 커야함
    * @ exception 좌석 등급 최대 발급 티켓 수 길이가 0보다 커야함
    * @ exception 좌석 등급 이름 배열 길이와 좌석 등급 가격 배열 길이가 일치해야함 
    * @ exception 좌석 등급 이름 배열 길이와 좌석 등급 최대 발행 티켓 수 배열 길이가 일치해야함
    */
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
        require(ticketClassNames.length > 0);
        require(ticketClassPrices.length > 0);
        require(ticketClassMaxMintCounts.length > 0);
        require(ticketClassNames.length == ticketClassPrices.length);
        require(ticketClassNames.length == ticketClassMaxMintCounts.length);

        _showScheduleId.increment();

        uint256 newShowScheduleId = _showScheduleId.current();
        ResellPolicy memory resellPolicy = ResellPolicy({ 
            isAvailable: isResellAvailable, 
            royaltyRatePercent: resellRoyaltyRatePercent, 
            priceLimit: resellPriceLimit 
        });

        TicketClassInfo[] memory ticketClassInfos = new TicketClassInfo[](ticketClassNames.length);
        for (uint256 i = 0; i < ticketClassNames.length; i++)
        {
            ticketClassInfos[i].name = ticketClassNames[i];
            ticketClassInfos[i].price = ticketClassPrices[i];
            ticketClassInfos[i].maxMintCount = ticketClassMaxMintCounts[i];
        }

        ShowSchedule newShowSchedule = new ShowSchedule(msg.sender, showId, stageName, startedAt, endedAt, maxMintCount, ticketClassInfos, resellPolicy, _currencyContractAddress, _ticketContractAddress);
        
        _showScheduleAddrs[newShowScheduleId] = address(newShowSchedule);
        _showScheduleOwners[newShowScheduleId] = msg.sender;
        _showScheduleIdsByOwner[msg.sender].push(newShowScheduleId);

        emit ShowScheduleCreated(newShowScheduleId, address(newShowSchedule));
    }

    /*
    * ownerOf
    * 공연 스케줄 ID에 해당하는 관리자의 Wallet 주소 반환
    *
    * @ param uint256 showScheduleId 공연 스케줄 ID
    * @ return address 공연 스케줄 ID를 소유하는 wallet 주소
    * @ exception None
    */
    function ownerOf(uint256 showScheduleId) public view returns(address) {
        return _showScheduleOwners[showScheduleId];
    }

    /*
    * getCount
    * 현재까지 등록된 공연 스케줄 개수 반환
    *
    * @ param None
    * @ return uint256 등록된 공연 스케줄 개수
    * @ exception None
    */
    function getCount() public view returns (uint256) {
        return _showScheduleId.current();
    }

    /*
    * getShowSchedule
    * 공연 스케줄 ID에 해당하는 공연 스케줄 Contract 주소 반환
    *
    * @ param uint256 showScheduleId 공연 스케줄 ID
    * @ return address 공연 스케줄 ID에 해당하는 계약 주소
    * @ exception None
    */
    function getShowSchedule(uint256 showScheduleId) public view returns(address) {
        return _showScheduleAddrs[showScheduleId];
    }

    /*
    * getShowSchedulesCount
    * 어떤 관리자 A가 관리하는 공연 스케줄의 개수를 반환
    *
    * @ param address walletAddr 관리자의 지갑 주소
    * @ return uint256 관리하는 공연 ID 개수
    * @ exception None
    */
    function getShowSchedulesCount(address walletAddr) public view returns (uint256){
        return _showScheduleIdsByOwner[walletAddr].length;
    }    

    /*
    * getShowSchedulesOfOwner
    * 어떤 관리자 A가 관리하는 공연 스케줄의 목록을 반환
    *
    * @ param address walletAddr 관리자의 지갑 주소
    * @ return uint256[] 관리하는 공연 ID 목록
    * @ exception None
    */
    function getShowSchedulesOfOwner(address walletAddr) public view returns(uint256[] memory) {
        return _showScheduleIdsByOwner[walletAddr];
    }
}