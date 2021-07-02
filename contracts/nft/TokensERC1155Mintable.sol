// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155.sol";

contract MintableNFT is NFT  {
    bytes32 public constant NFT_MINTER_ROLE = keccak256("NFT_MINTER_ROLE");

    function mint(address account, bytes32 cid)
    public
    {
        require(hasRole(NFT_MINTER_ROLE, msg.sender), 'NFT cannot be created');
        _defineNFT(account, uint256(cid));
        _mint(account, uint256(cid), NFT_SUPPLY, "");
    }

    function mintBatch(address to, bytes32[] memory cids, uint256[] memory amounts)
    public
    {
        require(hasRole(NFT_MINTER_ROLE, msg.sender), 'NFT cannot be created');
        uint[] memory ids = new uint[](cids.length);

        for (uint i = 0; i < cids.length; i++) {
            ids[i] = uint256(cids[i]);
            _defineNFT(to, ids[i]);
        }

        _mintBatch(to, ids, amounts, "");
    }
}
