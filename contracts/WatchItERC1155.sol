// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./nft/TokensERC1155Burnable.sol";
import "./nft/TokensERC1155Mintable.sol";
import "./nft/TokensERC1155Transferable.sol";


contract WatchItERC1155 is TransferableNFT, MintableNFT, BurnableNFT {
    uint32 public version;

    function initialize() public initializer {
        __ERC1155_init("");
        __MintableNFT_init();
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(NFT_MINTER_ROLE, msg.sender);
    }

    function upgrade() public{
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Version cannot be updated.");
        version++;
    }

    function setURI(string memory newuri) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "URI cannot be updated.");
        _setURI(newuri);
    }
}
