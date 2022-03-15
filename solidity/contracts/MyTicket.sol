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

    function create(string memory tokenURI, uint8 showScheduleId, uint8 seatId, uint256 price) public returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _setShowScheduleId(newTokenId, showScheduleId);
        _setSeatId(newTokenId, seatId);
        _setPrice(newTokenId, price);
        _setMinterId(newTokenId, msg.sender);

        return newTokenId;
    }

    function create(address to, string memory tokenURI, uint8 showScheduleId, uint8 seatId, uint256 price) public returns (uint256) {
        require(to != address(0), "receiving address cannot to be 0x0");
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _setShowScheduleId(newTokenId, showScheduleId);
        _setSeatId(newTokenId, seatId);
        _setPrice(newTokenId, price);
        _setMinterId(newTokenId, msg.sender);

        return newTokenId;
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

    function _setShowScheduleId(uint256 tokenId, uint8 showScheduleId) private {
        _showScheduleIds[tokenId] = showScheduleId;
    }

    function _setSeatId(uint256 tokenId, uint8 seatId) private {
        _seatIds[tokenId] = seatId;
    }

    function _setPrice(uint256 tokenId, uint256 price) private {
        _prices[tokenId] = price;
    }

    function _setMinterId(uint256 tokenId, address minterId) private {
        _minterIds[tokenId] = minterId;
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
        if (_showScheduleIds[tokenId] != 0) {
            delete _showScheduleIds[tokenId];
        }
        if (_seatIds[tokenId] != 0) {
            delete _seatIds[tokenId];
        }
        if (_prices[tokenId] != 0) {
            delete _prices[tokenId];
        }
        if (_minterIds[tokenId] != address(0)) {
            delete _minterIds[tokenId];
        }
    }
}