//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "hardhat/console.sol";


contract Tokens is ERC1155, AccessControl {
  uint256 private constant NFT_SUPPLY = 1;
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant NFT_MINTER_ROLE = keccak256("NFT_MINTER_ROLE");

  // Reserve first 10 tokens watchit
  uint256 public nextTokenId = 11;

  constructor() ERC1155("") {
      _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
      _setupRole(MINTER_ROLE, msg.sender);
      _setupRole(NFT_MINTER_ROLE, msg.sender);
  }

  function mintNFT(address account, string memory uri, bytes memory data)
  public
  {
    require(hasRole(NFT_MINTER_ROLE, msg.sender), 'NFT cannot be created');
    _setURI(uri); // Add uri in NFT process only
    mint(account, NFT_SUPPLY, data);
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

    uint[] storage ids;
    uint numToMint = amounts.length;

    uint i = 0;
    for (i = 0; i < numToMint; i++) {
      ids.push(nextTokenId + i);
    }

    _mintBatch(to, ids, amounts, data);
    nextTokenId += numToMint;
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
