// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IPurchaseGateway.sol";

interface IPurchaseGatewayCaller {

    function safeTransferTo(IPurchaseGateway oracle, address buyer, uint256 cid) external payable;

}
