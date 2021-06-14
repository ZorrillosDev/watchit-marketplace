// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155.sol";

abstract contract BurnableNFT is NFT  {

    function burn(address account, uint256 id) public {
        bool isAdmin = hasRole(DEFAULT_ADMIN_ROLE, msg.sender);
        require((isAdmin || (isOwnerOf(id) && isCreatorOf(id))), 'NFT cannot be burned');
        _defineNFT("", address(0), id);
        _burn(account, id, NFT_SUPPLY);
    }

    function burnBatch(address account, uint256[] memory ids, uint256[] memory amounts) public {
        _burnBatch(account, ids, amounts); // TODO
    }


}