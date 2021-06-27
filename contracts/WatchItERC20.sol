// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract WatchItERC20 is ERC20Upgradeable {
  bool private initialized;
  uint32 public version;

  function initialize(uint256 initialSupply) public initializer {
    ERC20Upgradeable.__ERC20_init("WatchIt", "WATCHIT");
    _mint(msg.sender, initialSupply);
  }
}
