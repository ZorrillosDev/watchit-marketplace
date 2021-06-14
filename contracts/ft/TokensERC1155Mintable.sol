// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155.sol";

abstract contract MintableFT is FT  {
    // Reserve first 10 tokens watchit
    uint256 public nextTokenId;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

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
