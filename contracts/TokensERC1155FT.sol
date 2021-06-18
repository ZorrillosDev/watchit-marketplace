// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ft/TokensERC1155Burnable.sol";
import "./ft/TokensERC1155Mintable.sol";
import "./ft/TokensERC1155Transferable.sol";


contract FToken is TransferableFT, MintableFT, BurnableFT {
    event SetURI(string _contract, address indexed _from, string _uri);
    event Initialize(string _contract, address indexed _from, uint256 _nextTokenID);

    function initialize() public initializer {
        __ERC1155_init("");
        __MintableNFT_init();
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        // See: "Avoid Initial Values in Field Declaration.." at
        // https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable
        nextTokenId = 11; // Initial nextToken state

        emit Initialize("FToken", msg.sender, nextTokenId);
    }

    function setURI(string memory newuri) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "URI cannot be updated.");
        _setURI(newuri);

        emit SetURI("FToken", msg.sender, newuri);
    }
}
