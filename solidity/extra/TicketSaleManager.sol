// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./TicketSale.sol";

contract TicketSaleManager is Ownable {
    address[] public ticketSales;

    constructor() {
        
    }

    function createTicketSale(
        uint256 tokenId,
        uint256 price,
        uint256 purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address currencyAddress,
        address nftAddress
    ) public returns (address) {

    }

    function allTicketSales() public view returns (address[] memory) {
        return ticketSales;
    }
}