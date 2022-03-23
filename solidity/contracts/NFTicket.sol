// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./MyTicket.sol";
import "./ShowScheduleManager.sol";

contract NFTicket {
    MyTicket private _myTicket;
    ShowScheduleManager private _showScheduleManager;

    constructor() {
        _myTicket = new MyTicket();
        _showScheduleManager = new ShowScheduleManager(getAddressOfMyTicket());
    }

    function getAddressOfMyTicket() public returns(address) {
        return address(_myTicket);
    }

    function getAddressOfShowScheduleManager() public returns(address) {
        return address(_showScheduleManager);
    }
}