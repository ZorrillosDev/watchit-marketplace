//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";


contract Tokens is ERC1155, AccessControl {
  uint8 private constant NFT_SUPPLY = 1;
  bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant NFT_MINTER_ROLE = keccak256("NFT_MINTER_ROLE");
  mapping(uint256=>bytes32) private nftURICollection;
  mapping(uint256=>address) private creators;

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

  function isValidNFT(uint256 id) public view returns(bool){
    return nftURICollection[id] != "";
  }

  function isOwnerOf(uint256 id) public view returns(bool){
      return balanceOf(msg.sender, id) > 0;
  }

  function isCreatorOf(uint256 id) public view returns(bool){
    return creators[id] != address(0);
  }

  function getNFTUri(uint256 id) public view virtual returns (bytes32){
    require(isOwnerOf(id), "Only owner can view NFT url");
    return nftURICollection[id];
  }

  function _setCreator(address _to, uint256 id) private {
    creators[id] = _to;
  }

  function _setNFTUri(bytes32 _uri, uint256 id) private {
    nftURICollection[id] = _uri;
  }

  function _defineNFT(bytes32 _uri, address account, uint256 id) private {
    // One only function to handle NFT internal definition
    _setNFTUri(_uri, id); // set uri for current NFT
    _setCreator(account, id); // set creator for current NFT
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

  function burn(address account, uint256 id, uint256 amount) public {
    _burn(account, id, amount); //TODO
  }

  function burnNFT(address account, uint256 id) public {
    bool isAdmin = hasRole(DEFAULT_ADMIN_ROLE, msg.sender);
    require((isAdmin || (isOwnerOf(id) && isCreatorOf(id))), 'NFT cannot be burned');
    creators[id] = address(0);
    _burn(account, id, NFT_SUPPLY);
  }

  function burnBatchNFT(address account, uint256[] memory ids, uint256[] memory amounts) public {
    _burnBatch(account, ids, amounts); // TODO
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

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC1155, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
