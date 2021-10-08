// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IPurchaseGateway.sol";

interface IPurchaseGatewayCaller {

    event PurchaseRequestSent(uint256 cid);
    event PurchaseResponseReceived(uint256 cid, address owner, uint256 price);

    function purchase(IPurchaseGateway oracle, address owner, uint256 cid) external payable;

    function requestPurchase(address owner, uint256 cid, IPurchaseGateway oracle) external payable;

}
