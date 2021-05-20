//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "hardhat/console.sol";


contract Tokens is ERC1155, AccessControl {
  bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  uint256 public nextTokenId = 1;

  constructor() ERC1155("") {
      _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
      _setupRole(URI_SETTER_ROLE, msg.sender);
      _setupRole(MINTER_ROLE, msg.sender);
  }

  function setURI(string memory newuri) public {
    require(hasRole(URI_SETTER_ROLE, msg.sender), "URI cannot be updated.");
    _setURI(newuri);
  }

  function mint(address account, uint256 amount, bytes memory data)
    public
  {
    require(hasRole(MINTER_ROLE, msg.sender));

    _mint(account, nextTokenId, amount, data);
    nextTokenId += 1;
  }

  function mintBatch(address to, uint256[] memory amounts, bytes memory data)
    public
  {
    require(hasRole(MINTER_ROLE, msg.sender));
    uint256 [] idList;
    for(; nextTokenId < amounts.length; nextTokenId++){
      idList.push(nextTokenId);
    }

    _mintBatch(to, idList, amounts, data);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC1155, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
