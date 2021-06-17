// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract NFT is ERC1155Upgradeable, AccessControl {
    uint8 internal constant NFT_SUPPLY = 1;
    mapping(uint256=>bytes32) private nftURICollection;
    mapping(uint256=>address) private creators;

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
        // require(isOwnerOf(id), "Only owner can view NFT url");
        return nftURICollection[id];
    }

    function _defineNFT(bytes32 _uri, address account, uint256 id) internal {
        // One only function to handle NFT internal definition
        nftURICollection[id] = _uri; // set uri for current NFT
        creators[id] = account; // set creator for current NFT
    }

    function _msgSender() internal view override(Context, ContextUpgradeable) returns (address) {
        return super._msgSender();
    }

    function _msgData() internal view override(Context, ContextUpgradeable) returns (bytes calldata) {
       return super._msgData();
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC1155Upgradeable, AccessControl)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
