//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./TokensERC1155Burnable.sol";
import "hardhat/console.sol";


contract Tokens is TokensERC1155Burnable {

  bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant NFT_MINTER_ROLE = keccak256("NFT_MINTER_ROLE");

  // Reserve first 10 tokens watchit
  uint256 public nextTokenId = 11;

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

  function transferNFT(
    address from,
    address to,
    uint256 id,
    bytes memory data
  )
  public
  virtual
  {
    require((isOwnerOf(id) && isValidNFT(id)), 'Only owner can transfer NFT');
    safeTransferFrom(from, to, id, NFT_SUPPLY, data);
  }

  function mintNFT(address account, bytes32  _uri, bytes memory data)
  public
  {
    require(hasRole(NFT_MINTER_ROLE, msg.sender), 'NFT cannot be created');
    _defineNFT(_uri, account, nextTokenId);
    mint(account, NFT_SUPPLY, data);
  }

  function mintBatchNFT(address to, bytes32[] memory _uris, bytes memory data)
  public
  {
    require(hasRole(NFT_MINTER_ROLE, msg.sender), 'NFT cannot be created');
    uint numToMint = _uris.length;
    uint[] memory amounts = new uint[](numToMint);
    uint[] memory ids = new uint[](numToMint);

    for (uint16 i = 0; i < numToMint; i++) {
      _defineNFT(_uris[i], to, nextTokenId + i);
      ids[i] = nextTokenId + i;
      amounts[i] = NFT_SUPPLY;
    }

    _mintBatch(to, ids, amounts, data);
    nextTokenId += numToMint;
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

    uint numToMint = amounts.length;
    uint[] memory ids = new uint[](numToMint);

    for (uint16 i = 0; i < numToMint; i++) {
      ids[i] = nextTokenId + i;
    }

    _mintBatch(to, ids, amounts, data);
    nextTokenId += numToMint;
  }

}
