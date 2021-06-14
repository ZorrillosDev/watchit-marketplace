// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./nft/TokensERC1155Burnable.sol";
import "./nft/TokensERC1155Mintable.sol";
import "./nft/TokensERC1155Transferable.sol";


contract NFToken is TransferableNFT, MintableNFT, BurnableNFT {
    function initialize() initializer public {
        __ERC1155_init("");
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(NFT_MINTER_ROLE, msg.sender);
        //https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#avoid-initial-values-in-field-declarations
        nextTokenId = 11; // Initial nextToken state
    }


  function setURI(string memory newuri) public {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "URI cannot be updated.");
    _setURI(newuri);
  }

}
