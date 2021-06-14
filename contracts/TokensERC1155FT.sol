// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ft/TokensERC1155Burnable.sol";
import "./ft/TokensERC1155Mintable.sol";
import "./ft/TokensERC1155Transferable.sol";


contract FToken is TransferableFT, MintableFT, BurnableFT {
  function initialize() initializer public {
      __ERC1155_init("");
      _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
      _setupRole(MINTER_ROLE, msg.sender);
      //https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#avoid-initial-values-in-field-declarations
      nextTokenId = 11; // Initial nextToken state
  }

  function setURI(string memory newuri) public {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "URI cannot be updated.");
    _setURI(newuri);
  }

}
