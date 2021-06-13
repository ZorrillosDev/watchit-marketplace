// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155Burnable.sol";
import "./TokensERC1155Mintable.sol";
import "./TokensERC1155Transferable.sol";


contract Tokens is Transferable, Mintable, Burnable {
  bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");

  constructor() ERC1155("") {
      _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
      _setupRole(URI_SETTER_ROLE, msg.sender);
      _setupRole(MINTER_ROLE, msg.sender);
      _setupRole(NFT_MINTER_ROLE, msg.sender);
  }

  function setURI(string memory newuri) public {
    require(hasRole(URI_SETTER_ROLE, msg.sender), "URI cannot be updated.");
    _setURI(newuri);
  }

}
