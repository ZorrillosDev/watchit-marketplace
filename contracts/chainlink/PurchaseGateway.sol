// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";
import "./IPurchaseGateway.sol";
import "./IPurchaseGatewayCaller.sol";

contract PurchaseGateway is ChainlinkClient, IPurchaseGateway, IERC165 {
    using Chainlink for Chainlink.Request;
    // https://market.link/jobs/056e5e2d-c596-4509-8396-7a94d342299b/spec
    bytes32 internal _jobId;
    uint256 internal _fees;

    struct RequestCommitment {
        IPurchaseGatewayCaller caller; /// The contract caller
        uint256 cid;
    }

    mapping(bytes32 => RequestCommitment) internal requests;
    mapping(uint256 => uint256) internal prices;

    constructor(bytes32 jobId, address oracle, address link, uint256 fees) public {
        setChainlinkToken(link);
        setChainlinkOracle(oracle);
        _jobId = jobId;
        _fees = fees;
    }

    /** @notice Receive the response in form of multiple-variable
      * @param _requestId chain link request identifier.
      * @param price the price returned by API
      * @dev emit PurchaseRequestDone event when delegate callback is done
      */
    function fulFillNFTPrice(bytes32 _requestId, uint256 price)
    external override
    recordChainlinkFulfillment(_requestId)
    {
        /// Step 3 => gateway oracle exec callback with received data
        /// delegate call to `purchase` method back here to `IPurchaseGatewayCaller` contract
        /// delegate call context https://solidity-by-example.org/delegatecall/
        requests[_requestId].caller.purchase(this, requests[_requestId].cid);
        prices[requests[_requestId].cid] = price;
        delete requests[_requestId];
        /// Assign default value back
    }

    /** @notice Return current NFT price by cid
      *
      * @param cid IPFS content unique identifier.
      * @return current NFT price
      */
    function getCurrentPriceForCID(uint256 cid) view external override returns (uint256){
        return prices[cid];
    }

    /** @notice Create a Chainlink request to retrieve API response.
      * Add the request into mapping to keep tracking of caller.
      *
      * @param cid IPFS content unique identifier.
      * @param caller origin contract
      */
    function requestNFTPrice(uint256 cid, IPurchaseGatewayCaller caller)
    override
    external
    {
        /// Step 2 => gateway oracle request off-chain data
        /// Here the chain link requests and exec as callback fulFillNFTPrice on result ready
        Chainlink.Request memory request = buildChainlinkRequest(_jobId, address(this), this.fulFillNFTPrice.selector);
        request.add("get", "https://run.mocky.io/v3/88965c16-d784-4e43-9f37-822535673889");
        request.add("path", "RAW.PRICE");
        // Keep the request needed data while request finish
        request.addInt("times", 10**18); // Multiply the result by 1000000000000000000 to remove decimals
        bytes32 requestId = sendChainlinkRequest(request, _fees);
        requests[requestId] = RequestCommitment(caller, cid);
//        emit PurchaseRequestReceived(requestId);
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IPurchaseGateway).interfaceId;
    }

}
