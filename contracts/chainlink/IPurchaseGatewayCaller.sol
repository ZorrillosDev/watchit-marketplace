// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IPurchaseGateway.sol";
import "@openzeppelin/contracts/interfaces/IERC1155.sol";

interface IPurchaseGatewayCaller {

    function holderOf(uint256 cid) view external returns (address);

    function safeTransferTo(address _buyer, uint256 cid) external;

}
