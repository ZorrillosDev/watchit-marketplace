// SPDX-License-Identifier: MIT
// NatSpec format convention - https://docs.soliditylang.org/en/v0.5.10/natspec-format.html
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {Hex} from "./lib/Strings.sol";

contract WNFT is ERC1155Upgradeable, AccessControlUpgradeable {
    error InvalidPurchaseOperation();
    using Hex for uint256;

    uint8 internal constant NFT_SUPPLY = 1;
    bytes32 internal constant NFT_MINTER_ROLE = keccak256("NFT_MINTER_ROLE");
    mapping(uint256 => mapping(address => uint256)) private _nftApprovals;

    // Triggered when a new approval is made for cid.
    event ApprovalForCID(
        address indexed operator,
        uint256 cid,
        uint256 approved
    );
    // Triggered when a new creator is set for a cid.
    event CreatorForCID(address indexed creator, uint256 cid);

    /// The current NFT holder
    mapping(uint256 => address) internal holders;
    uint32 public version;

    function initialize() public initializer {
        __ERC1155_init("ipfs://f0{id}/index.json");
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(NFT_MINTER_ROLE, msg.sender);
    }

    function uri(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        string memory hexTokenToString;
        hexTokenToString = _tokenId.toHexStr();
        return
            string(
                abi.encodePacked("ipfs://f0", hexTokenToString, "/index.json")
            );
    }

    function upgrade() external {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Version cannot be updated."
        );
        version++;
    }

    function setURI(string memory newuri) external {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "URI cannot be updated."
        );
        _setURI(newuri);
    }

    /**
     * @notice Set initial holder for cid.
     * This method is expected to be called by the content creator to set itself as the initial "holder".
     * @param cid IPFS content unique identifier.
     */
    function setHolder(uint256 cid, address holder) external {
        require(
            holders[cid] == address(0),
            "This token id already has a holder associated."
        );
        holders[cid] = holder;
        emit CreatorForCID(holder, cid);
    }

    /**
     * @notice This works like setApprovalForAll with cid reference instead of sender
     * Why this? ApprovalForAll set approval for every action from operator. In our case we need
     * allow actions for specific cid and operator
     * @param operator current buyer
     * @param cid NFT id
     * @param approved bid amount for cid
     * @dev See {IERC1155-setApprovalForAll}.
     *
     */
    function setApprovalFor(
        address operator,
        uint256 cid,
        uint256 approved
    ) public virtual {
        require(approved > 0, "Invalid approved amount.");
        require(msg.sender != operator, "Setting approval status for self.");
        require(
            msg.sender == holders[cid],
            "Only owner can set approval for CID."
        );

        _nftApprovals[cid][operator] = approved;
        emit ApprovalForCID(operator, cid, approved);
    }

    /**
     * @dev See {IERC1155-isApprovedForAll}.
     */
    function isApprovedFor(address operator, uint256 cid)
        public
        view
        virtual
        returns (bool)
    {
        return _nftApprovals[cid][operator] > 0;
    }

    /**
     * @notice Check for safe transfer using custom approval
     * @param cid IPFS content unique identifier.
     * @dev emit PurchaseResponseReceived on purchase ready to get done
     */
    function safePurchase(uint256 cid) public payable {
        require(holders[cid] != address(0), "Invalid cid.");
        require(holders[cid] != msg.sender, "Invalid buyer.");
        require(
            isApprovedFor(msg.sender, cid),
            "Caller is not owner nor approved."
        );
        require(
            msg.value == _nftApprovals[cid][msg.sender],
            "Invalid amount for approved bid."
        );

        // Get the seller id from the current holder
        address payable seller = payable(holders[cid]);
        (bool successPay, ) = seller.call{value: msg.value}("");
        require(successPay, "Failed to transfer payment to seller.");

        // Lazy Mint:
        // We can try to check if the cid is already minted in seller balance
        // else mint the movie directly to buyer
        if (balanceOf(seller, cid) > 0) {
            _safeTransferFrom(holders[cid], msg.sender, cid, NFT_SUPPLY, "0x0");
        } else {
            _mint(msg.sender, cid, NFT_SUPPLY, "0x0");
            emit TransferSingle(
                msg.sender,
                address(0),
                msg.sender,
                cid,
                NFT_SUPPLY
            );
        }

        // Reset approvals for cid
        delete _nftApprovals[cid][msg.sender];
        // Set new holder
        holders[cid] = msg.sender;
    }

    /**
     * @notice Return the current holder for cid
     * @param cid IPFS content unique identifier.
     */
    function holderOf(uint256 cid) external view returns (address) {
        return holders[cid];
    }

    /**
     * @notice Check for safe transfer using custom approval
     * @param cid IPFS content unique identifier.
     * @dev emit PurchaseResponseReceived on purchase ready to get done
     */
    function mint(address account, uint256 cid) public {
        require(hasRole(NFT_MINTER_ROLE, msg.sender), "NFT cannot be created");
        /// All keys already "exist" in a Solidity mapping with a default value of 0
        require(
            holders[cid] == address(0),
            "This token ID has already been minted"
        );
        holders[cid] = account;
        _mint(account, cid, NFT_SUPPLY, "");
    }

    function mintBatch(address to, uint256[] memory cids) public {
        require(hasRole(NFT_MINTER_ROLE, msg.sender), "NFT cannot be created");
        uint256[] memory ids = new uint256[](cids.length);
        uint256[] memory amounts = new uint256[](cids.length);

        for (uint256 i = 0; i < cids.length; i++) {
            require(
                holders[cids[i]] == address(0),
                "This token ID has already been minted"
            );
            ids[i] = cids[i];
            holders[ids[i]] = to;
            amounts[i] = NFT_SUPPLY;
        }

        _mintBatch(to, ids, amounts, "");
    }

    function transfer(
        address from,
        address to,
        uint256 cid
    ) public {
        safeTransferFrom(from, to, cid, NFT_SUPPLY, "0x0");
        holders[cid] = to;
    }

    function burn(address account, uint256 cid) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "NFT cannot be burned"
        );
        _burn(account, cid, NFT_SUPPLY);
        holders[cid] = address(0);
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
