// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract WVC is ERC20Upgradeable, AccessControlUpgradeable {
  bool private initialized;
  uint32 public version;

  function upgrade() public{
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Version cannot be updated.");
    version++;
  }

  function initialize(uint256 initialSupply) public initializer {
    ERC20Upgradeable.__ERC20_init("WatchIt Video Coin", "WVC");
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _mint(msg.sender, initialSupply);
  }

  function mint(address account, uint256 amount) public {
    _mint(account, amount);
  }

  function burn(address account, uint256 amount) public {
    _burn(account, amount);
  }
}
