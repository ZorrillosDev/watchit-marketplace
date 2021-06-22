// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155NFT.sol";


contract NFTokenV2 is NFToken {

    function myUpgradedTokenId() public view returns (uint256){
        return nextTokenId;
    }

}
