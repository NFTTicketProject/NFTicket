// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/*
* 공연 티켓을 ERC-721 Token(NFT)으로 생성하는 Contract
* 
* @author 김형준
* @version 0.1
* @see None
*/

contract MyTicket is ERC721Enumerable {
    using Counters for Counters.Counter;

    /// IERC721Metadata 요소
    // NFT(티켓) 생성 시 마다 1씩 증가하는 ID
    Counters.Counter private _tokenIds;
    // NFT 메타데이터 URI 저장을 위한 mapping
    mapping(uint256 => string) private _tokenURIs;

    /// Custom 요소
    // 공연 스케줄(Contract) ID 저장을 위한 mapping
    mapping(uint256 => uint256) private _showScheduleIds;
    // 좌석 등급(Contract) ID 저장을 위한 mapping
    mapping(uint256 => uint256) private _classIds;
    // NFT 토큰 발행 지갑의 Address 저장을 위한 mapping
    mapping(uint256 => address) private _minters;

    constructor() ERC721("MyTicket", "TKT") public {}

    /*
    * create
    * 새로운 티켓 정보를 가진 ERC-721 토큰을 생성
    * 메타데이터(IPFS) URI와 공연 스케줄 ID 및 좌석 등급 ID를 입력 받아 새로운 토큰을 발급
    * 토큰에 관한 정보는 Contract의 mapping에 저장
    * 
    * @ param uint256 tokenId 생성된 티켓의 토큰 아이디
    * @ return None
    * @ exception None
    */
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

    /*
    * _burn
    * 토큰 소각(burn)시, tokenURI, showScheduleId, classId, minter 등 tokenId에 해당하는 Custom 멤버 변수들을 삭제
    * Openzeppelin ERC721URIStorage 요소 구현
    * 
    * @ param uint256 tokenId 생성된 티켓의 토큰 아이디
    * @ return None
    * @ exception None
    */
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

    // ERC721URIStorage: TokenURI setter
    function _setTokenURI(
            uint256 tokenId, 
            string memory _tokenURI
        ) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _setMinter(
            uint256 tokenId, 
            address minter
        ) private {
        _minters[tokenId] = minter;
    }

    function _setShowScheduleId(
            uint256 tokenId, 
            uint256 showScheduleId
        ) private {
        _showScheduleIds[tokenId] = showScheduleId;
    }

    function _setClassId(
            uint256 tokenId, 
            uint256 classId
        ) private {
        _classIds[tokenId] = classId;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function getMinter(uint256 tokenId) public view returns (address) {
        return _minters[tokenId];
    }

    function getShowScheduleId(uint256 tokenId) public view returns (uint256) {
        return _showScheduleIds[tokenId];
    }

    function getClassId(uint256 tokenId) public view returns (uint256) {
        return _classIds[tokenId];
    }
}