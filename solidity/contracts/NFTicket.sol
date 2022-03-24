// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./SsafyToken.sol";
import "./MyTicket.sol";
import "./ShowScheduleManager.sol";
import "./TicketSaleManager.sol";

contract NFTicket {
    SsafyToken private _token;
    MyTicket private _myTicket;
    ShowScheduleManager private _showScheduleManager;
    TicketSaleManager private _ticketSaleManager;

    constructor(address tokenContractAddress, address ticketContractAddress) {
        _token = SsafyToken(tokenContractAddress);
        _myTicket = MyTicket(ticketContractAddress);
        _showScheduleManager = new ShowScheduleManager(tokenContractAddress, ticketContractAddress);
        _ticketSaleManager = new TicketSaleManager(tokenContractAddress, ticketContractAddress);
    }

    function getAddressOfToken() public returns(address) {
        return address(_token);
    }

    function getAddressOfMyTicket() public returns(address) {
        return address(_myTicket);
    }

    function getAddressOfShowScheduleManager() public returns(address) {
        return address(_showScheduleManager);
    }

    function getAddressOfTicketSaleManager() public returns(address) {
        return address(_ticketSaleManager);
    }
}