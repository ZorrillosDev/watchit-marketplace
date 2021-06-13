// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155.sol";

abstract contract Transferable is NFT  {

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


}
