// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract TicketClass {
    using Counters for Counters.Counter;
    Counters.Counter ticketClassIds;
    mapping(uint256 => string) ticketClassNames;
    mapping(uint256 => uint256) ticketClassPrices;
    mapping(uint256 => uint256) ticketClassMaxMintCounts;
    
    constructor() {}

    function create(string memory ticketClassName, uint256 ticketClassPrice, uint256 ticketClassMaxMintCount) public {
        ticketClassIds.increment();

        uint256 newTicketClassId = ticketClassIds.current();
        ticketClassNames[newTicketClassId] = ticketClassName;
        ticketClassPrices[newTicketClassId] = ticketClassPrice;
        ticketClassMaxMintCounts[newTicketClassId] = ticketClassMaxMintCount;
    }

    function TicketClassCount() public view returns(uint256) {
        return ticketClassIds.current();
    }

    function TicketClassName(uint256 ticketClassId) public view returns(string memory) {
        return ticketClassNames[ticketClassId];
    }

    function TicketClassPrice(uint256 ticketClassId) public view returns(uint256) {
        return ticketClassPrices[ticketClassId];
    }

    function TicketClassMaxMintCount(uint256 ticketClassId) public view returns(uint256) {
        return ticketClassMaxMintCounts[ticketClassId];
    }
}