// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract NFT is ERC1155Upgradeable, AccessControlUpgradeable {
    uint8 internal constant NFT_SUPPLY = 1;
    mapping(uint256=>address) private creators;

    function isOwnerOf(uint256 id) public view returns(bool){
        return balanceOf(msg.sender, id) > 0;
    }

    function isCreatorOf(uint256 id) public view returns(bool){
        return creators[id] != address(0);
    }

    function _defineNFT(address account, uint256 id) internal {
        creators[id] = account; // set creator for current NFT
    }


    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC1155Upgradeable, AccessControlUpgradeable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
