// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoyaltyToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("LoyaltyToken", "LTK") Ownable(initialOwner) {
        _mint(msg.sender, 1000000 * 10 ** decimals());  // Mint 1 million tokens to deployer
    }

    function issueTokens(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function redeemTokens(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
}

