// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";
import "./IPurchaseGateway.sol";
import "./IPurchaseGatewayCaller.sol";

contract PurchaseGateway is ChainlinkClient, IPurchaseGateway, IERC165 {
    using Chainlink for Chainlink.Request;

    bytes32 constant JOB_ID = bytes32("493610cff14346f786f88ed791ab7704");
    uint256 constant PAYMENT = 1 * LINK_DIVISIBILITY;

    struct Request {
        address caller; /// The contract caller
        address holder; /// The request declared owner,
        uint256 cid;
    }

    mapping(bytes32 => Request) internal requests;
    mapping(uint256 => uint256) internal prices;

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
        (bool success,) = requests[_requestId].caller.delegatecall(
            abi.encodeWithSignature(
                "purchase(IPurchaseGateway oracle, address owner, uint256 cid)",
                this, requests[_requestId].holder, requests[_requestId].cid
            )
        );

        prices[requests[_requestId].cid] = price;
        delete requests[_requestId];

        if (success) {
            emit PurchaseRequestDone(
                requests[_requestId].holder,
                requests[_requestId].cid,
                price
            );
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
    function requestNFTPrice(address owner, uint256 cid, IPurchaseGatewayCaller caller) override external {
        /// Step 2 => gateway oracle request off-chain data
        /// Here the chain link requests and exec as callback fulFillNFTPrice on result ready
        Chainlink.Request memory request = buildChainlinkRequest(JOB_ID, address(this), this.fulFillNFTPrice.selector);
        request.add("get", "https://run.mocky.io/v3/f09675f9-22c1-423e-bc56-275175fd2190");
        // Hold the request holders while request finish
        requests[sendChainlinkRequest(request, PAYMENT)] = Request(address(caller), owner, cid);
    }

    function concat(string memory a, string memory b, string memory c) private pure returns (string memory) {
        return string(abi.encodePacked(a, b, c));
    }

    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyString = bytes(source);
        if (tempEmptyString.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IPurchaseGateway).interfaceId;
    }

}
