// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract PurchaseGateway is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    mapping(uint256 => address) requests;
    bytes32 constant JOB_ID = bytes32("493610cff14346f786f88ed791ab7704");
    uint256 constant PAYMENT = 1 * LINK_DIVISIBILITY;

    event PurchaseRequestDone(address owner, uint256 cid, uint256 price);

    function fulFillNFTPrice(bytes32 _requestId, address owner, uint256 cid, uint256 price)
    public
    recordChainlinkFulfillment(_requestId)
    {
        // delegate call back here
        require(requests[cid] != address(0x0), "Invalid oracle request");

        (bool success,) = requests[cid].call(
            abi.encodeWithSignature(
                "purchase(address oracle, address owner, uint256 cid, uint256 price)",
                address(this), owner, cid, price
            )
        );
        requests[cid] = address(0x0);
        emit PurchaseRequestDone(owner, cid, price);
    }


    function requestNFTPrice(uint256 cid, address sender) public {
        // Wait until chainlink request has been processed
        require(requests[cid] == address(0x0), "Pending request in process");
        // Here the chain link requests and exec _callbackPurchase on result ready
        Chainlink.Request memory request = buildChainlinkRequest(JOB_ID, address(this), this.fulFillNFTPrice.selector);
        request.add("get", "https://run.mocky.io/v3/18a14efe-e718-4454-b09b-dcc1ccf6dd9c");
        requests[cid] = sender;

        // More code here needed
        sendChainlinkRequest(request, PAYMENT);
    }

}
