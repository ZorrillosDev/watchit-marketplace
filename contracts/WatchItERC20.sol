// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract WatchItERC20 is ERC20Upgradeable {
  bool private initialized;

  function initialize(uint256 initialSupply) public initializer {
    require(!initialized, "WatchItERC20 instance has already been initialized");

    ERC20Upgradeable.__ERC20_init("WatchIt", "WATCHIT");
    initialized = true;

    _mint(msg.sender, initialSupply);
  }
}
