// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./TokensERC1155NFT.sol";
import "./TokensERC1155FT.sol";


contract Tokens is AccessControl {
    FToken public ft;
    NFToken public nft;

    event Initialize(string _contract, address indexed _from, address _ft, address _nft);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function initialize(FToken _ft, NFToken _nft) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Can be upgrade by admin only.");
        ft = _ft;
        nft = _nft;

        emit Initialize("Tokens", msg.sender, address(_ft), address(_nft));
    }
}
