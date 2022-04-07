// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

interface ITicketClass {
    struct TicketClassInfo {
        string name;
        uint256 price;
        uint256 maxMintCount;
    }
}