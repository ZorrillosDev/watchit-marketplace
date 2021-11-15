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
    bytes32 public constant NFT_MINTER_ROLE = keccak256("NFT_MINTER_ROLE");
    mapping(uint256 => mapping(address => uint256)) private _nftApprovals;

    event ApprovalForCID(address indexed operator, uint256 cid, uint256 approved);

    /// The current NFT holder
    mapping(uint256 => address) internal holders;
    uint32 public version;

    function initialize() public initializer {
        __ERC1155_init("ipfs://f0{id}/index.json");
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(NFT_MINTER_ROLE, msg.sender);
    }


    function uri(uint256 _tokenId) public view virtual override returns (string memory) {
        string memory hexTokenToString;
        hexTokenToString = _tokenId.toHexStr();
        return string(
            abi.encodePacked(
                "ipfs://f0",
                hexTokenToString,
                "/index.json"
            )
        );
    }

    function upgrade() external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Version cannot be updated.");
        version++;
    }

    function setURI(string memory newuri) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "URI cannot be updated.");
        _setURI(newuri);
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
    function setApprovalFor(address operator, uint256 cid, uint256 approved) public virtual {
        require(_msgSender() != operator, "ERC1155: setting approval status for self");
        require(_msgSender() == holders[cid], "Only owner can set approval for CID");

        _nftApprovals[cid][operator] = approved;
        emit ApprovalForCID(operator, cid, approved);
    }

    /**
     * @dev See {IERC1155-isApprovedForAll}.
     */
    function isApprovedFor(address operator, uint256 cid) public view virtual returns (bool) {
        return _nftApprovals[cid][operator] != 0;
    }

    /** @notice Check for safe transfer using custom approval
      * @param cid IPFS content unique identifier.
      * @dev emit PurchaseResponseReceived on purchase ready to get done
      */
    function safePurchase(uint256 cid) public payable {
        require(holders[cid] != address(0x0), "Invalid cid");
        require(holders[cid] != msg.sender, "Invalid buyer");
        require(isApprovedFor(msg.sender, cid), "Caller is not owner nor approved");
        require(msg.value == _nftApprovals[cid][msg.sender], "Invalid amount for approved bid");

        address payable seller = payable(holders[cid]);
        (bool successPay,) = seller.call{value : msg.value}("");
        require(successPay, "Failed to transfer payment to seller");

        _safeTransferFrom(holders[cid], msg.sender, cid, NFT_SUPPLY, "0x0");
        delete _nftApprovals[cid][msg.sender]; /// gc
        holders[cid] = msg.sender;
    }

    function holderOf(uint256 cid) view external returns (address){
        return holders[cid];
    }

    function mint(address account, uint256 cid)
    public
    {
        /// All keys already "exist" in a Solidity mapping with a default value of 0
        require(holders[cid] == address(0x0), 'This token ID has already been minted');
        require(hasRole(NFT_MINTER_ROLE, msg.sender), 'NFT cannot be created');
        holders[cid] = account;
        _mint(account, cid, NFT_SUPPLY, "");
    }

    function mintBatch(address to, uint256[] memory cids)
    public
    {
        require(hasRole(NFT_MINTER_ROLE, msg.sender), 'NFT cannot be created');
        uint[] memory ids = new uint[](cids.length);
        uint[] memory amounts = new uint[](cids.length);

        for (uint i = 0; i < cids.length; i++) {
            require(holders[cids[i]] == address(0x0), 'This token ID has already been minted');
            ids[i] = cids[i];
            holders[ids[i]] = to;
            amounts[i] = NFT_SUPPLY;
        }

        _mintBatch(to, ids, amounts, "");
    }

    function transfer(address from, address to, uint256 cid) public {
        safeTransferFrom(from, to, cid, NFT_SUPPLY, "0x0");
        holders[cid] = to;
    }

    function burn(address account, uint256 cid) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'NFT cannot be burned');
        _burn(account, cid, NFT_SUPPLY);
        holders[cid] = address(0x0);
    }

    function burnBatch(address account, uint256[] memory ids, uint256[] memory amounts) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'NFT cannot be burned');
        _burnBatch(account, ids, amounts);
        // TODO
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
