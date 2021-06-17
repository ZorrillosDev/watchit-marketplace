// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./nft/TokensERC1155Burnable.sol";
import "./nft/TokensERC1155Mintable.sol";
import "./nft/TokensERC1155Transferable.sol";


contract NFTokenV2 is TransferableNFT, MintableNFT, BurnableNFT {
    function initialize() public initializer {
        __ERC1155_init("");
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(NFT_MINTER_ROLE, msg.sender);
    }

    function myUpgradedTokenId() public view returns (uint256){
        return nextTokenId;
    }

    function setURI(string memory newuri) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "URI cannot be updated.");
        _setURI(newuri);
    }
}
