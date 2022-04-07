// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// Resell 정책을 여러 Contract에서 관리하기 위한 Interface
interface IResellPolicy {
    struct ResellPolicy{
        bool isAvailable;
        uint8 royaltyRatePercent;
        uint256 priceLimit;
    }
}