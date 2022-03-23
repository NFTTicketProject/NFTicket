// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketSale is Ownable {
    address private _admin;
    address public _seller;
    address public _buyer;
    uint256 public _saleStartTime;
    uint256 public _saleEndTime;
    uint256 public _purchasePrice;
    uint256 public _tokenId;
    address public _currencyContractAddress;
    address public _ticketContractAddress;
    bool public _ended;

    IERC20 public _currencyContract;
    IERC721 public _ticketContract;

    constructor(
        address seller,
        uint256 tokenId,
        uint256 purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address currencyContractAddress,
        address ticketContractAddress
    ) {
        require(_minPrice > 0);
        _tokenId = tokenId;
        _purchasePrice = purchasePrice;
        _seller = seller;
        _saleStartTime = startTime;
        _saleEndTime = endTime;
        _currencyContractAddress = currencyContractAddress;
        _ticketContractAddress = ticketContractAddress;
        _ended = false;
        _currencyContract = IERC20(currencyContractAddress);
        _ticketContract = IERC721(ticketContractAddress);
    }

    function bid(uint256 bid_amount) public {
        // TODO
    }

    function purchase() public {
        // TODO 
    }

    function confirmItem() public {
        // TODO 
    }
    
    function cancelSales() public {
        // TODO
    }

    function getTimeLeft() public view returns (int256) {
        return (int256)(_saleEndTime - block.timestamp);
    }

    function getSaleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            uint256,
            address,
            address
        )
    {
        return (
            _saleStartTime,
            _saleEndTime,
            _minPrice,
            _purchasePrice,
            _tokenId,
            _currencyAddress,
            _nftAddress
        );
    }

    function _end() internal {
        ended = true;
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return _currencyContract.balanceOf(msg.sender);
    }

    modifier onlySeller() {
        require(msg.sender == _seller, "Sale: You are not seller.");
        _;
    }

    modifier onlyAfterStart() {
        require(block.timestamp >= _saleStartTime, "Sale: This sale is not started.");
        _;
    }
}
