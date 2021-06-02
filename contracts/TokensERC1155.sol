//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "hardhat/console.sol";


contract Tokens is ERC1155, AccessControl {
  uint256 private constant NFT_SUPPLY = 1;
  bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant NFT_MINTER_ROLE = keccak256("NFT_MINTER_ROLE");
  mapping(uint256=>string) private nftURICollection;

  // Reserve first 10 tokens watchit
  uint256 private constant RESERVED = 11;
  uint256 public nextTokenId = RESERVED;

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

  function isOwnerOf(uint256 id) public view returns(bool){
      return balanceOf(msg.sender, id) > 0;
  }

  function burnNFT(address account, uint256 id) public {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'Token cannot be burned.');
    _burn(account, id, NFT_SUPPLY);
  }

  function getNFTUri(uint256 id) public view virtual returns (string memory){
    require(isOwnerOf(id), "Only owner can view NFT url");
    return nftURICollection[id];
  }

  function _setNFTUri(string memory _uri) private{
    nftURICollection[nextTokenId] = _uri;
  }

  function mintNFT(address account, string memory _uri, bytes memory data)
  public
  {
    require(hasRole(NFT_MINTER_ROLE, msg.sender), 'NFT cannot be created');
    _setNFTUri(_uri); // allow only nft set uri
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
