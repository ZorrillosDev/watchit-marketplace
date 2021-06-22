// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155.sol";

contract BurnableFT is FT  {
    function burn(address account, uint256 id, uint256 amount) public {
        _burn(account, id, amount); //TODO
    }
}
