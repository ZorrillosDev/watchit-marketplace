// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract WNFT is ERC1155Upgradeable, AccessControlUpgradeable {
    uint8 internal constant NFT_SUPPLY = 1;
    bytes32 public constant NFT_MINTER_ROLE = keccak256("NFT_MINTER_ROLE");

    mapping(uint256=>address) internal creators;
    uint32 public version;

    function initialize() public initializer {
        __ERC1155_init("ipfs://{id}");
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(NFT_MINTER_ROLE, msg.sender);
    }

    function upgrade() public{
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Version cannot be updated.");
        version++;
    }

    function setURI(string memory newuri) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "URI cannot be updated.");
        _setURI(newuri);
    }

    function mint(address account, bytes32 cid)
    public
    {
        uint256 id = uint256(cid);

        // All keys already "exist" in a Solidity mapping with a default value of 0
        require(creators[id] == address(0), 'This token ID has already been minted');
        require(hasRole(NFT_MINTER_ROLE, msg.sender), 'NFT cannot be created');
        creators[id] = account;
        _mint(account, id, NFT_SUPPLY, "");
    }

    function mintBatch(address to, bytes32[] memory cids, uint256[] memory amounts)
    public
    {
        require(hasRole(NFT_MINTER_ROLE, msg.sender), 'NFT cannot be created');
        uint[] memory ids = new uint[](cids.length);

        for (uint i = 0; i < cids.length; i++) {
            ids[i] = uint256(cids[i]);
            require(creators[ids[i]] == address(0), 'This token ID has already been minted');
            creators[ids[i]] = to;
        }

        _mintBatch(to, ids, amounts, "");
    }

    function transfer(address from, address to, bytes32 cid) public {
        safeTransferFrom(from, to, uint256(cid), NFT_SUPPLY, "");
    }

    function burn(address account, bytes32 cid) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'NFT cannot be burned');

        uint256 id = uint256(cid);
        _burn(account, id, NFT_SUPPLY);
        creators[id] = address(0);
    }

    function burnBatch(address account, uint256[] memory ids, uint256[] memory amounts) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'NFT cannot be burned');

        _burnBatch(account, ids, amounts); // TODO
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC1155Upgradeable, AccessControlUpgradeable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}
