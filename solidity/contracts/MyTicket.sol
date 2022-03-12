// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contacts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/drafts/Counters.sol";

contract MyTicket is ERC721Full {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => uint8) _showScheduleIds;
    mapping(uint256 => uint8) _seatIds;
    mapping(uint256 => uint256) _prices;
    mapping(uint256 => uint256) _minterIds;
    
    constructor() ERC721Full("MyTicket", "MTKT") public {}

    function create(address to, string memory tokenURI, uint8 showScheduleId, uint8 seatId, uint256 price) public returns (uint256) {
        _tokenIds.increment();

        uint256 newTicketId = _tokenIds.current();
        _mint(to, newTicketId);
        _setTokenURI(newTicketId, tokenURI);
        _setShowScheduleId(newTicketId, showScheduleId);
        _setSeatId(newTicketId, seatId);
        _setPrice(newTicketId, price);
        _setMinterId(newTicketId, msg.sender);

        return newTicketId;
    }

    function _setShowScheduleId(uint256 id, uint8 showScheduleId) private {
        _showScheduleIds[id] = showScheduleId;
    }

    function _setSeatId(uint256 id, uint8 seatId) private {
        _seatIds[id] = seatId;
    }

    function _setPrice(uint256 id, uint256 price) private {
        _prices[id] = price;
    }

    function _setMinterId(uint256 id, uint256 minterId) private {
        _minterIds[id] = minterId;
    }

    function ShowScheduleId(uint256 tokenId) public view returns (uint8) {
        return _showScheduleIds[tokenId];
    }

    function SeatId(uint256 tokenId) public view returns (uint8) {
        return _seatIds[tokenId];
    }

    function Price(uint256 tokenId) public view returns (uint256) {
        return _prices[tokenId];
    }

    function MinterId(uint256 tokenId) public view returns (uint256) {
        return _minterIds[tokenId];
    }
}