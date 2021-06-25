// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155.sol";

contract MintableNFT is NFT  {
    // Reserve first 10 tokens watchit
    uint256 public nextTokenId;
    bytes32 public constant NFT_MINTER_ROLE = keccak256("NFT_MINTER_ROLE");

    function __MintableNFT_init() internal initializer {
        __MintableNFT_init_unchained();
    }

    function __MintableNFT_init_unchained() internal initializer {
        // See: "Avoid Initial Values in Field Declaration.." at
        // https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable
        nextTokenId = 11;
    }

    function mint(address account, bytes32  _uri, bytes memory data)
    public
    {
        require(hasRole(NFT_MINTER_ROLE, msg.sender), 'NFT cannot be created');
        _defineNFT(_uri, account, nextTokenId);
        _mint(account, nextTokenId, NFT_SUPPLY, data);
        nextTokenId += 1;
    }

    function mintBatch(address to, bytes32[] memory _uris, bytes memory data)
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
}
