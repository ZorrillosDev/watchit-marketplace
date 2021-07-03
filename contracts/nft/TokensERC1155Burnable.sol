// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155.sol";

contract BurnableNFT is NFT  {

    function burn(address account, bytes32 cid) public {
        bool isAdmin = hasRole(DEFAULT_ADMIN_ROLE, msg.sender);
        uint256 id = uint256(cid);
        require((isAdmin || (isOwnerOf(id) && isCreatorOf(id))), 'NFT cannot be burned');
        _burn(account, id, NFT_SUPPLY);
        creators[id] = address(0);
    }

    function burnBatch(address account, uint256[] memory ids, uint256[] memory amounts) public {
        _burnBatch(account, ids, amounts); // TODO
    }


}
