// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyTicket is ERC721Enumerable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _tokenURIs;

    struct ResellPolicy{
        bool isAvailable;
        uint8 royaltyRatePercent;
        uint256 priceLimit;
    }

    mapping(uint256 => uint256) _showScheduleIds;
    mapping(uint256 => uint64) _classIds;
    mapping(uint256 => address) _minterIds;
    mapping(uint256 => ResellPolicy) _resellPolicies;   // map tokenId to ReselPolicy
    mapping(uint256 => uint256) _issuePrices;
    
    constructor() ERC721("MyTicket", "TKT") public {}

    function create(address to, string memory ticketURI, uint256 showScheduleId, uint64 classId, uint256 issuePrice, bool isResellAvailable, uint8 resellRoyaltyRatePercent, uint256 resellPriceLimit) public returns (uint256) {
        require(to != address(0), "Receiving address cannot to be 0x0");
        require(resellRoyaltyRatePercent <= 100, "The resellRoyaltyRatePercent should be smaller than 100");
        require(resellPriceLimit > 0, "The resellPriceLimit should be larger than 0");
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, ticketURI);
        _setShowScheduleId(newTokenId, showScheduleId);
        _setClassId(newTokenId, classId);
        _setIssuePrice(newTokenId, issuePrice);
        _setMinterId(newTokenId, msg.sender);
        _setResellPolicy(newTokenId, isResellAvailable, resellRoyaltyRatePercent, resellPriceLimit);
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

    function _setShowScheduleId(uint256 tokenId, uint256 showScheduleId) private {
        _showScheduleIds[tokenId] = showScheduleId;
    }

    function _setClassId(uint256 tokenId, uint64 classId) private {
        _classIds[tokenId] = classId;
    }

    function _setMinterId(uint256 tokenId, address minterId) private {
        _minterIds[tokenId] = minterId;
    }

    function _setResellPolicy(uint256 tokenId, bool isResellAvailable, uint8 resellRoyaltyPercent, uint256 resellPriceLimit) private {
        _resellPolicies[tokenId] = ResellPolicy({ 
                isAvailable: isResellAvailable, 
                royaltyRatePercent: resellRoyaltyPercent, 
                priceLimit: resellPriceLimit 
            });
    }

    function _setIssuePrice(uint256 tokenId, uint256 issuePrice) private {
        _issuePrices[tokenId] = issuePrice;
    }

    function TokenURI(uint256 tokenId) public view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function ShowScheduleId(uint256 tokenId) public view returns (uint256) {
        return _showScheduleIds[tokenId];
    }

    function ClassId(uint256 tokenId) public view returns (uint64) {
        return _classIds[tokenId];
    }

    function MinterId(uint256 tokenId) public view returns (address) {
        return _minterIds[tokenId];
    }

    function IssuePrice(uint256 tokenId) public view returns (uint256) {
        return _issuePrices[tokenId];
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
        if (_issuePrices[tokenId] != 0) {
            delete _issuePrices[tokenId];
        }
        if (_minterIds[tokenId] != address(0)) {
            delete _minterIds[tokenId];
        }
    }
}