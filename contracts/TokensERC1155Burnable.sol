// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155NFT.sol";

abstract contract Burnable is TokensERC1155NFT  {
    function burn(address account, uint256 id, uint256 amount) public {
        _burn(account, id, amount); //TODO
    }

    function burnNFT(address account, uint256 id) public {
        bool isAdmin = hasRole(DEFAULT_ADMIN_ROLE, msg.sender);
        require((isAdmin || (isOwnerOf(id) && isCreatorOf(id))), 'NFT cannot be burned');
        _defineNFT("", address(0), id);
        _burn(account, id, NFT_SUPPLY);
    }

    function burnBatchNFT(address account, uint256[] memory ids, uint256[] memory amounts) public {
        _burnBatch(account, ids, amounts); // TODO
    }


}
