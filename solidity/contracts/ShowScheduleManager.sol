// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./ShowSchedule.sol";
import "./MyTicket.sol";
import "./IResellPolicy.sol";
import "./ITicketClass.sol";

contract ShowScheduleManager is IResellPolicy, ITicketClass {
    using Counters for Counters.Counter;
    Counters.Counter private _showScheduleId;
    mapping(uint256 => address) private _showScheduleAddrs;
    mapping(uint256 => address) private _showScheduleOwners;
    mapping(address => uint256[]) private _showScheduleIdsByOwner;
    address private _currencyContractAddress;
    address private _ticketContractAddress;
    
    constructor(address currencyContractAddress, address ticketContractAddress) {
        _currencyContractAddress = currencyContractAddress;
        _ticketContractAddress = ticketContractAddress;
    }

    function create(
            uint64 showId,
            string memory stageName, 
            uint256 startedAt, 
            uint256 endedAt, 
            uint256 maxMintCount, 
            string[] memory ticketClassNames, 
            uint256[] memory ticketClassPrices, 
            uint256[] memory ticketClassMaxMintCounts,
            bool isResellAvailable, 
            uint8 resellRoyaltyRatePercent, 
            uint256 resellPriceLimit
        ) public {
        require(ticketClassNames.length > 0);
        require(ticketClassPrices.length > 0);
        require(ticketClassMaxMintCounts.length > 0);
        require(ticketClassNames.length == ticketClassPrices.length);
        require(ticketClassNames.length == ticketClassMaxMintCounts.length);

        _showScheduleId.increment();

        uint256 newShowScheduleId = _showScheduleId.current();
        ResellPolicy memory resellPolicy = ResellPolicy({ 
            isAvailable: isResellAvailable, 
            royaltyRatePercent: resellRoyaltyRatePercent, 
            priceLimit: resellPriceLimit 
        });

        TicketClassInfo[] memory ticketClassInfos = new TicketClassInfo[](ticketClassNames.length);
        for (uint256 i = 0; i < ticketClassNames.length; i++)
        {
            ticketClassInfos[i].name = ticketClassNames[i];
            ticketClassInfos[i].price = ticketClassPrices[i];
            ticketClassInfos[i].maxMintCount = ticketClassMaxMintCounts[i];
        }

        ShowSchedule newShowSchedule = new ShowSchedule(msg.sender, showId, stageName, startedAt, endedAt, maxMintCount, ticketClassInfos, resellPolicy, _currencyContractAddress, _ticketContractAddress);
        
        _showScheduleAddrs[newShowScheduleId] = address(newShowSchedule);
        _showScheduleOwners[newShowScheduleId] = msg.sender;
        _showScheduleIdsByOwner[msg.sender].push(newShowScheduleId);
    }

    function ownerOf(uint256 showScheduleId) public view returns(address) {
        return _showScheduleOwners[showScheduleId];
    }
    function getCount() public view returns (uint256) {
        return _showScheduleId.current();
    }

    function getShowSchedule(uint256 showScheduleId) public view returns(address) {
        return _showScheduleAddrs[showScheduleId];
    }
    function getShowSchedulesCount(address walletAddr) public view returns (uint256){
        return _showScheduleIdsByOwner[walletAddr].length;
    }    
    function getShowSchedulesOfOwner(address walletAddr) public view returns(uint256[] memory) {
        return _showScheduleIdsByOwner[walletAddr];
    }
}