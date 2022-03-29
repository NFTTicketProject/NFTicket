// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./TicketSale.sol";
import "./MyTicket.sol";
import "./ShowSchedule.sol";
import "./ShowScheduleManager.sol";

contract TicketSaleManager is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _saleIds;
    mapping(uint256 => address) private _saleAddrs;
    mapping(uint256 => address) private _saleOwners;
    mapping(address => uint256[]) private _saleIdsByWallet;
    mapping(uint256 => Counters.Counter) private _saleCountOfTicket;
    address private _showScheduleManagerContractAddress;
    address private _currencyContractAddress;
    address private _ticketContractAddress;

    constructor(address showScheduleManagerContractAddress, address currencyContractAddress, address ticketContractAddress) {
        _showScheduleManagerContractAddress = showScheduleManagerContractAddress;
        _currencyContractAddress = currencyContractAddress;
        _ticketContractAddress = ticketContractAddress;
    }

    function create(uint256 ticketId, address seller, string memory description, uint256 price, uint256 startedAt, uint256 endedAt) public {
        _saleIds.increment();

        uint256 showScheduleId = MyTicket(_ticketContractAddress).getShowScheduleId(ticketId);
        address showScheduleAddr = ShowScheduleManager(_showScheduleManagerContractAddress).getShowSchedule(showScheduleId);
        (bool isAvailable, , uint256 priceLimit) = ShowSchedule(showScheduleAddr).getResellPolicy();
        require(isAvailable, "This ticket cannot be resell");
        require(price < priceLimit || priceLimit == 0, "You must not sell over the resell limit price");
        
        uint256 newTicketSaleId = _saleIds.current();
        TicketSale newTicketSale = new TicketSale(ticketId, seller, description, price, startedAt, endedAt, _showScheduleManagerContractAddress, _currencyContractAddress, _ticketContractAddress);

        MyTicket(_ticketContractAddress).approve(address(newTicketSale), ticketId);

        _saleAddrs[newTicketSaleId] = address(newTicketSale);
        _saleOwners[newTicketSaleId] = msg.sender;
        _saleIdsByWallet[msg.sender].push(newTicketSaleId);
        _saleCountOfTicket[ticketId].increment();
    }

    function withdrawRoyalty() public payable onlyOwner {
        uint256 contractBalance = IERC20(_currencyContractAddress).balanceOf(address(this));
        IERC20(_currencyContractAddress).transfer(owner(), contractBalance);
    }

    function ownerOf(uint256 saleId) public view returns(address) {
        return _saleOwners[saleId];
    }

    function getSale(uint256 saleId) public view returns(address) {
        return _saleAddrs[saleId];
    }

    function getCount() public view returns (uint256) {
        return _saleIds.current();
    }

    function getSaleIdsByWallet(address walletAddr) public view returns(uint256[] memory) {
        return _saleIdsByWallet[walletAddr];
    }

    function getSaleCountOfTicket(uint256 ticketId) public view returns(uint256) {
        return _saleCountOfTicket[ticketId].current();
    }
}