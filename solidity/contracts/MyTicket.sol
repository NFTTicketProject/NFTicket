// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyTicket is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => uint8) _showScheduleIds;
    mapping(uint256 => uint8) _seatIds;
    mapping(uint256 => uint256) _prices;
    mapping(uint256 => address) _minterIds;

    mapping(uint256 => string) private _tokenURIs;
    
    constructor() ERC721("MyTicket", "TKT") public {}

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

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        if (bytes(base).length == 0) {
            return _tokenURI;
        }

        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
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

    function _setMinterId(uint256 id, address minterId) private {
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

    function MinterId(uint256 tokenId) public view returns (address) {
        return _minterIds[tokenId];
    }

    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }
}