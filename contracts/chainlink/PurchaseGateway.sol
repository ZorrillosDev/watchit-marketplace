// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";
import "./IPurchaseGateway.sol";
import "./IPurchaseGatewayCaller.sol";

contract PurchaseGateway is ChainlinkClient, IPurchaseGateway, IERC165 {
    using Chainlink for Chainlink.Request;
    error FailedChainLinkDelegation();

    bytes32 internal _jobId;
    uint256 internal _fees;
    uint8 internal constant NFT_SUPPLY = 1;

    struct RequestCommitment {
        address caller; /// The contract caller
        uint256 cid; // NFT cid
        address buyer; // Current buyer
        uint bid; // How much ETH sent?
    }

    mapping(bytes32 => RequestCommitment) internal requests;
    mapping(uint256 => uint256) internal prices;

    constructor(address oracle, string memory jobId, uint256 fees, address link) public {
        if (link == address(0x0)) {
            // If main-net use public link contract
            setPublicChainlinkToken();
        } else {
            // Use testnet provided link
            setChainlinkToken(link);
        }

        setChainlinkOracle(oracle);
        _jobId = stringToBytes32(jobId);
        _fees = fees;
    }

    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    /** @notice Call to `caller contract` method holderOf to get current NFT holder
      * @param _requestId chain link request identifier.
      */
    function holderOfCall(bytes32 _requestId) internal returns (address) {
        (bool success, bytes memory data) = requests[_requestId].caller.call(
            abi.encodeWithSignature("holderOf(uint256)", requests[_requestId].cid)
        );

        require(success, "Invalid callee");
        return abi.decode(data, (address));
    }

    /** @notice Call to `caller contract` method _safeTransferFrom to transfer token
      * @param _requestId chain link request identifier.
      * @param seller Current owner
      */
    function safeTransferFromCall(bytes32 _requestId, address seller) internal {
        (bool success,) = requests[_requestId].caller.call(
            abi.encodeWithSignature(
                "safeTransferTo(address,uint256)",
                requests[_requestId].buyer,
                requests[_requestId].cid
            )
        );

        require(success, "Cannot transfer token");
    }

    /** @notice Handle callback to callee for NFT purchase
      * @param _requestId chain link request identifier.
      * @dev emit PurchaseRequestDone event when delegate callback is done
      */
    function callBackToCaller(bytes32 _requestId) internal {
        /// Step 3 => gateway oracle delegate call to this method to finish purchase
        /// Delegate call from callback contract oracle
        address owner = holderOfCall(_requestId);
        require(prices[requests[_requestId].cid] > 0, "Invalid CID price");
        require(requests[_requestId].bid >= prices[requests[_requestId].cid], "Not enough ETH");

        address payable seller = payable(owner);
        (bool successPay,) = seller.call{value : prices[requests[_requestId].cid]}("");
        require(successPay, "Failed to transfer token to seller");
        safeTransferFromCall(_requestId, owner);
    }

    /** @notice Receive the response in form of multiple-variable
      * @param _requestId chain link request identifier.
      * @param _price the price returned by API
      * @dev emit PurchaseRequestDone event when delegate callback is done
      */
    function fulFillPrice(bytes32 _requestId, uint256 _price)
    public
    override
    recordChainlinkFulfillment(_requestId)
    {
        /// Step 2 => gateway oracle exec callback with received data
        /// delegate call to `purchase` method back here to `IPurchaseGatewayCaller` contract
        /// delegate call context https://solidity-by-example.org/delegatecall/
        prices[requests[_requestId].cid] = _price;
        // set current price before delegate call
        callBackToCaller(_requestId);
        delete requests[_requestId];
        emit PurchaseRequestDone(
            _requestId,
            _price
        );

    }

    /** @notice Return current NFT price by cid
      *
      * @param cid IPFS content unique identifier.
      * @return current NFT price
      */
    function getCurrentPriceForCID(uint256 cid) view public override returns (uint256){
        return prices[cid];
    }

    /** @notice Create a Chainlink request to retrieve API response.
      * Add the request into mapping to keep tracking of caller.
      *
      * @param cid IPFS content unique identifier.
      * @param caller origin contract
      */
    function requestPurchase(uint256 cid, IPurchaseGatewayCaller caller)
    public
    payable
    override
    returns (bytes32)
    {
        /// Step 1 => gateway oracle request off-chain data
        /// Here the chain link requests and exec as callback fulFillNFTPrice on result ready
        Chainlink.Request memory request = buildChainlinkRequest(_jobId, address(this), this.fulFillPrice.selector);
        request.add("get", "https://run.mocky.io/v3/0f86f2df-0fab-492b-b2ec-9c943b4cced1");
        request.add("path", "RAW.PRICE");
        // Keep the request needed data while request finish
        bytes32 requestId = sendChainlinkRequest(request, _fees);
        requests[requestId] = RequestCommitment(address(caller), cid, msg.sender, msg.value);
        emit PurchaseRequestReceived(requestId);
        return requestId;
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IPurchaseGateway).interfaceId;
    }

}
