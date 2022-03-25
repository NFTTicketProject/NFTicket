// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

interface IResellPolicy {
    struct ResellPolicy{
        bool isAvailable;
        uint8 royaltyRatePercent;
        uint256 priceLimit;
    }
}