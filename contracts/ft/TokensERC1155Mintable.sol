// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokensERC1155.sol";

contract MintableFT is FT  {
    // Reserve first 10 tokens watchit
    uint256 public nextTokenId;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    event Mint(address indexed _by, uint256 _tokenId, uint256 _amount, bytes data);
    event MintBatch(address indexed _by, uint[] _ids, uint256[] _amount, bytes data);

    function __MintableNFT_init() internal initializer {
        __MintableNFT_init_unchained();
    }

    function __MintableNFT_init_unchained() internal initializer {
        // See: "Avoid Initial Values in Field Declaration.." at
        // https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable
        nextTokenId = 11;
    }

    function mint(address account, uint256 amount, bytes memory data)
    public
    {
        require(hasRole(MINTER_ROLE, msg.sender));
        _mint(account, nextTokenId, amount, data);
        emit Mint(account, nextTokenId, amount, data);

        nextTokenId += 1;
    }

    function mintBatch(address to, uint256[] memory amounts, bytes memory data)
    public
    {
        require(hasRole(MINTER_ROLE, msg.sender));

        uint numToMint = amounts.length;
        uint[] memory ids = new uint[](numToMint);

        for (uint16 i = 0; i < numToMint; i++) {
            ids[i] = nextTokenId + i;
        }

        _mintBatch(to, ids, amounts, data);
        emit MintBatch(to, ids, amounts, data);

        nextTokenId += numToMint;
    }

}
