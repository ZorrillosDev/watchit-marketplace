// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";
import "./IPurchaseGateway.sol";
import "./IPurchaseGatewayCaller.sol";

contract PurchaseGateway is ChainlinkClient, IPurchaseGateway, IERC165 {
    using Chainlink for Chainlink.Request;

    bytes32 internal _jobId;
    uint256 internal _fees;

    struct RequestCommitment {
        IPurchaseGatewayCaller caller; /// The contract caller
        uint256 cid;
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
        /// Step 3 => gateway oracle exec callback with received data
        /// delegate call to `purchase` method back here to `IPurchaseGatewayCaller` contract
        /// delegate call context https://solidity-by-example.org/delegatecall/
        prices[requests[_requestId].cid] = _price;
        delete requests[_requestId];

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
    function requestNFTPrice(uint256 cid, IPurchaseGatewayCaller caller)
    public
    payable
    override
    returns (bytes32)
    {
        /// Step 2 => gateway oracle request off-chain data
        /// Here the chain link requests and exec as callback fulFillNFTPrice on result ready
        Chainlink.Request memory request = buildChainlinkRequest(_jobId, address(this), this.fulFillPrice.selector);
        request.add("get", "https://run.mocky.io/v3/ae286aa0-c81d-4010-952f-909428a35fab");
        request.add("path", "RAW.PRICE");
        // Keep the request needed data while request finish
        bytes32 requestId = sendChainlinkRequest(request, _fees);
        requests[requestId] = RequestCommitment(caller, cid);
        emit PurchaseRequestReceived(requestId);
        return requestId;
    }


    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IPurchaseGateway).interfaceId;
    }

}
