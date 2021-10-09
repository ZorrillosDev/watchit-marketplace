// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IPurchaseGateway.sol";

interface IPurchaseGatewayCaller {

    function purchase(IPurchaseGateway oracle, uint256 cid) external payable;

}
