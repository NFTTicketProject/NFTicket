// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

/*
* 좌석 등급 정보를 보존하는 Contract
* 
* @author 김형준
* @version 0.1
* @see None
*/

contract TicketClass {
    using Counters for Counters.Counter;
    
    // 좌석 등급 생성 시마다 1씩 증가하는 ID
    Counters.Counter private ticketClassIds;
    // 좌석 등급별 이름 저장을 위한 mapping
    mapping(uint256 => string) private ticketClassNames;
    // 좌석 등급별 가격 저장을 위한 mapping
    mapping(uint256 => uint256) private ticketClassPrices;
    // 좌석 등급별 최대 발급 티켓 수 저장을 위한 mapping
    mapping(uint256 => uint256) private ticketClassMaxMintCounts;
    
    constructor() {}

    /*
    * create
    * 새로운 좌석 등급 정보를 가진 Contract를 생성
    * 좌석 등급에 관한 정보는 Contract의 mapping에 저장
    * 
    * @ param string ticketClassName 좌석 등급 이름
    * @ param string ticketClassPrice 좌석 등급 가격
    * @ param string ticketClassMaxMintCount 좌석 등급 최대 발급 티켓 수
    * @ return None
    * @ exception None
    */
    function create(string memory ticketClassName, uint256 ticketClassPrice, uint256 ticketClassMaxMintCount) public {
        ticketClassIds.increment();

        uint256 newTicketClassId = ticketClassIds.current();
        ticketClassNames[newTicketClassId] = ticketClassName;
        ticketClassPrices[newTicketClassId] = ticketClassPrice;
        ticketClassMaxMintCounts[newTicketClassId] = ticketClassMaxMintCount;
    }

    /*
    * getTicketClassCount
    * 현재까지 등록된 티켓 등급 개수 반환
    * 
    * @ param None
    * @ return uint256 티켓 등급 개수
    * @ exception None
    */
    function getTicketClassCount() public view returns(uint256) {
        return ticketClassIds.current();
    }

    function getTicketClassName(uint256 ticketClassId) public view returns(string memory) {
        return ticketClassNames[ticketClassId];
    }

    function getTicketClassPrice(uint256 ticketClassId) public view returns(uint256) {
        return ticketClassPrices[ticketClassId];
    }

    function getTicketClassMaxMintCount(uint256 ticketClassId) public view returns(uint256) {
        return ticketClassMaxMintCounts[ticketClassId];
    }
}