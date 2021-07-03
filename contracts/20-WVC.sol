// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract WVC is ERC20Upgradeable {
  bool private initialized;
  uint32 public version;
  // TODO: _owner / ACL stuff

  function initialize(uint256 initialSupply) public initializer {
    ERC20Upgradeable.__ERC20_init("WatchIt Video Coin", "WVC");
    _mint(msg.sender, initialSupply);
  }

  function mint(address account, uint256 amount) public {
    _mint(account, amount);
  }

  function burn(address account, uint256 amount) public {
    _burn(account, amount);
  }
}
