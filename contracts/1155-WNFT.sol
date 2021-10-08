// SPDX-License-Identifier: MIT
// NatSpec format convention - https://docs.soliditylang.org/en/v0.5.10/natspec-format.html
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "./chainlink/IPurchaseGateway.sol";
import "./chainlink/IPurchaseGatewayCaller.sol";

contract WNFT is ERC1155Upgradeable, ChainlinkClient, AccessControlUpgradeable, IPurchaseGatewayCaller {
    ///    error InvalidOracleRequest();
    using Chainlink for Chainlink.Request;

    uint8 internal constant NFT_SUPPLY = 1;
    bytes32 public constant NFT_MINTER_ROLE = keccak256("NFT_MINTER_ROLE");
    bytes32 constant JOB_ID = bytes32("493610cff14346f786f88ed791ab7704");
    uint256 constant PAYMENT = 1 * LINK_DIVISIBILITY;

    /// The current NFT holder
    mapping(uint256 => address) internal holders;
    uint32 public version;

    function initialize() public initializer {
        __ERC1155_init("ipfs://{id}");
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(NFT_MINTER_ROLE, msg.sender);
    }

    function upgrade() external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Version cannot be updated.");
        version++;
    }

    function setURI(string memory newuri) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "URI cannot be updated.");
        _setURI(newuri);
    }

    /** @notice Handle delegated call from oracle with metadata needed for purchase
      * @param oracle origin delegate call.
      * @param owner address for current NFT owner.
      * @param cid IPFS content unique identifier.
      * @dev emit PurchaseResponseReceived on purchase ready to get done
      */
    function purchase(IPurchaseGateway oracle, address owner, uint256 cid) external override payable {
        /// Step 4 => gateway oracle delegate call to this method to finish purchase
        /// Delegate call from callback contract oracle
        uint256 price = oracle.getCurrentPriceForCID(cid);
        require(msg.value > 0, "Not enough ETH");
        require(msg.value >= price, "Not enough ETH");
        require(balanceOf(owner, cid) > 0, "Invalid seller");

        address payable seller = payable(owner);
        address payable buyer = payable(msg.sender);
        seller.transfer(msg.value);
        emit PurchaseResponseReceived(cid, owner, price);

        if (holders[cid] == address(0x0)) {
            // Not existing cid, need to be minted -> lazy mint
            emit TransferSingle(msg.sender, address(0x0), owner, cid, NFT_SUPPLY);
            mint(msg.sender, cid);
        } else {
            // existing already -> transfer
            transfer(seller, buyer, cid);
        }

    }

    /** @notice Delegate call to oracle to request NFT metadata
      * @param cid IPFS content unique identifier.
      * @param oracle target delegate call.
      * @dev emit PurchaseRequestSent on delegate call to gateway get success
      */
    function requestPurchase(address owner, uint256 cid, IPurchaseGateway oracle) override external payable {
        /// Step 1 => request purchase to delegate call to purchase gateway
        /// delegate call context https://solidity-by-example.org/delegatecall/
        oracle.requestNFTPrice(owner, cid, this);
        emit PurchaseRequestSent(cid);

    }

    function mint(address account, uint256 cid)
    public
    {
        /// All keys already "exist" in a Solidity mapping with a default value of 0
        require(holders[cid] == address(0), 'This token ID has already been minted');
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
            ids[i] = cids[i];
            require(holders[ids[i]] == address(0), 'This token ID has already been minted');
            holders[ids[i]] = to;
            amounts[i] = NFT_SUPPLY;
        }

        _mintBatch(to, ids, amounts, "");
    }

    function transfer(address from, address to, uint256 cid) public {
        safeTransferFrom(from, to, cid, NFT_SUPPLY, " ");
        holders[cid] = to;
    }

    function burn(address account, uint256 cid) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'NFT cannot be burned');
        _burn(account, cid, NFT_SUPPLY);
        holders[cid] = address(0);
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
        return interfaceId == type(IPurchaseGatewayCaller).interfaceId || super.supportsInterface(interfaceId);
    }

}
