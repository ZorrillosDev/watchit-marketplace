// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "./IPurchaseGateway.sol";
import "./IPurchaseGatewayCaller.sol";

contract PurchaseGateway is ChainlinkClient, IPurchaseGateway {
    using Chainlink for Chainlink.Request;

    mapping(uint256 => IPurchaseGatewayCaller) requests;
    mapping(uint256 => uint256) internal prices;
    bytes32 constant JOB_ID = bytes32("493610cff14346f786f88ed791ab7704");
    uint256 constant PAYMENT = 1 * LINK_DIVISIBILITY;


    function fulFillNFTPrice(bytes32 _requestId, address owner, uint256 cid, uint256 price)
    external override
    recordChainlinkFulfillment(_requestId)
    {
        // Step 3 => gateway oracle exec callback with received data
        // delegate call to `purchase` method back here to `IPurchaseGatewayCaller` contract
        require(requests[cid] != IPurchaseGatewayCaller(address(0x0)), "Invalid oracle request");
        (bool success,) = address(requests[cid]).call(
            abi.encodeWithSignature(
                "purchase(address oracle, address owner, uint256 cid)",
                address(this), owner, cid
            )
        );

        prices[cid] = price;
        requests[cid] = IPurchaseGatewayCaller(address(0x0));

        if (success) {
            emit PurchaseRequestDone(owner, cid, price);
        }
    }

    function getCurrentPriceForCID(uint256 cid) view external override returns (uint256){
        return prices[cid];
    }


    function requestNFTPrice(uint256 cid, IPurchaseGatewayCaller caller) override external {
        // Step 2 => gateway oracle request off-chain data
        // Wait until chainlink request has been processed
        require(requests[cid] == IPurchaseGatewayCaller(address(0x0)), "Pending request in process");
        // Here the chain link requests and exec as callback fulFillNFTPrice on result ready
        Chainlink.Request memory request = buildChainlinkRequest(JOB_ID, address(this), this.fulFillNFTPrice.selector);
        request.add("get", "https://run.mocky.io/v3/18a14efe-e718-4454-b09b-dcc1ccf6dd9c");
        requests[cid] = caller;
        sendChainlinkRequest(request, PAYMENT);
    }

}
