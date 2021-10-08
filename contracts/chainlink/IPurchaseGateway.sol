// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IPurchaseGatewayCaller.sol";

interface IPurchaseGateway {

    event PurchaseRequestDone(bytes32 requestId, uint256 price);
    event PurchaseRequestReceived(bytes32 requestId);

    function fulFillNFTPrice(bytes32 _requestId, uint256 price) external;

    function getCurrentPriceForCID(uint256 cid) view external returns (uint256);

    function requestNFTPrice(address owner, uint256 cid, IPurchaseGatewayCaller caller) external;

}
