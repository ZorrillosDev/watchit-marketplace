// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./TokensERC1155NFT.sol";
import "./TokensERC1155FT.sol";


contract Tokens is AccessControl {
    FToken public ft;
    NFToken public nft;

    event Initialize(address indexed _from);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        emit Initialize(msg.sender);
    }

    function initialize(FToken _ft, NFToken _nft) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Can be upgrade by admin only.");
        ft = _ft;
        nft = _nft;
    }




}
