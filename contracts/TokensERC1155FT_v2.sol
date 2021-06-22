// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155FT.sol";

contract FTokenV2 is FToken {

    function myUpgradedTokenId() public view returns (uint256){
        return nextTokenId;
    }

}
