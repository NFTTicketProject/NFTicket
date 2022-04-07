// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SsafyToken is ERC20, Ownable{
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
    
    function mint(uint256 amount) public onlyOwner{
        _mint(_msgSender(), amount);
    }
    
    function forceToTransfer(address from, address to, uint256 amount) public onlyOwner{
        _transfer(from, to, amount);
    }
}