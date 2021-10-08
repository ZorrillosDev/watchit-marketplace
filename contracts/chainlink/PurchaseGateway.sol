// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";
import "./IPurchaseGateway.sol";
import "./IPurchaseGatewayCaller.sol";

contract PurchaseGateway is ChainlinkClient, IPurchaseGateway, IERC165 {
    using Chainlink for Chainlink.Request;

    mapping(uint256 => address) requests;
    mapping(uint256 => uint256) internal prices;
    bytes32 constant JOB_ID = bytes32("493610cff14346f786f88ed791ab7704");
    uint256 constant PAYMENT = 1 * LINK_DIVISIBILITY;


    /** @notice Receive the response in form of multiple-variable
      * @param oracle origin delegate call.
      * @param owner address for current NFT owner.
      * @param cid IPFS content unique identifier.
      * @param price the price returned by API
      * @emit PurchaseRequestDone event when delegate callback is done
      */
    function fulFillNFTPrice(bytes32 _requestId, address owner, uint256 cid, uint256 price)
    external override
    recordChainlinkFulfillment(_requestId)
    {
        // Step 3 => gateway oracle exec callback with received data
        // delegate call to `purchase` method back here to `IPurchaseGatewayCaller` contract
        // delegate call context https://solidity-by-example.org/delegatecall/
        require(requests[cid] != address(0x0), "Invalid oracle request");
        (bool success,) = requests[cid].delegatecall(
            abi.encodeWithSignature(
                "purchase(IPurchaseGateway oracle, address owner, uint256 cid)",
                this, owner, cid
            )
        );

        prices[cid] = price;
        requests[cid] = address(0x0);

        if (success) {
            emit PurchaseRequestDone(owner, cid, price);
        }
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
    function requestNFTPrice(uint256 cid, IPurchaseGatewayCaller caller) override external {
        // Step 2 => gateway oracle request off-chain data
        // Wait until chainlink request has been processed
        require(requests[cid] == address(0x0), "Pending request in process");
        // Here the chain link requests and exec as callback fulFillNFTPrice on result ready
        Chainlink.Request memory request = buildChainlinkRequest(JOB_ID, address(this), this.fulFillNFTPrice.selector);
        request.add("get", "https://run.mocky.io/v3/18a14efe-e718-4454-b09b-dcc1ccf6dd9c");
        requests[cid] = address(caller);
        sendChainlinkRequest(request, PAYMENT);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IPurchaseGateway).interfaceId;
    }

}
