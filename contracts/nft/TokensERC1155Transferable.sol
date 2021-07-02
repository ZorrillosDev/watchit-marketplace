// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155.sol";

contract TransferableNFT is NFT  {

    function transfer(
        address from,
        address to,
        bytes32 cid,
        bytes memory data
    )
    public
    virtual
    {
        uint256 id = uint256(cid);
        require(isOwnerOf(id), 'Only owner can transfer NFT');
        safeTransferFrom(from, to, id, NFT_SUPPLY, data);
    }


}
