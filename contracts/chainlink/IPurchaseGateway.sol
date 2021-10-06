// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IPurchaseGatewayCaller.sol";

interface IPurchaseGateway {

    event PurchaseRequestDone(address owner, uint256 cid, uint256 price);

    function fulFillNFTPrice(bytes32 _requestId, address owner, uint256 cid, uint256 price) external;

    function getCurrentPriceForCID(uint256 cid) view external returns (uint256);

    function requestNFTPrice(uint256 cid, IPurchaseGatewayCaller caller) external;

}
