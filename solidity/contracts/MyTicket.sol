// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyTicket is ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _tokenURIs;

    mapping(uint256 => uint256) private _showScheduleIds;
    mapping(uint256 => uint256) private _classIds;
    mapping(uint256 => address) private _minters;
    
    constructor() ERC721("MyTicket", "TKT") public {}

    function create(
            string memory ticketURI, 
            uint256 showScheduleId, 
            uint256 classId
        ) public returns (uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setMinter(newTokenId, msg.sender);
        _setTokenURI(newTokenId, ticketURI);
        _setShowScheduleId(newTokenId, showScheduleId);
        _setClassId(newTokenId, classId);

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

    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
        if (_showScheduleIds[tokenId] != 0) {
            delete _showScheduleIds[tokenId];
        }
        if (_classIds[tokenId] != 0) {
            delete _classIds[tokenId];
        }
        if (_minters[tokenId] != address(0)) {
            delete _minters[tokenId];
        }
    }

    function _setMinter(uint256 tokenId, address minter) private {
        _minters[tokenId] = minter;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _setShowScheduleId(uint256 tokenId, uint256 showScheduleId) private {
        _showScheduleIds[tokenId] = showScheduleId;
    }

    function _setClassId(uint256 tokenId, uint256 classId) private {
        _classIds[tokenId] = classId;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function getShowScheduleId(uint256 tokenId) public view returns (uint256) {
        return _showScheduleIds[tokenId];
    }

    function getClassId(uint256 tokenId) public view returns (uint256) {
        return _classIds[tokenId];
    }

    function getMinter(uint256 tokenId) public view returns (address) {
        return _minters[tokenId];
    }
}