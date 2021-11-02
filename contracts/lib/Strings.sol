// SPDX-License-Identifier: MIT
// https://gist.github.com/soenkeba/c7ddf262c370f099a6256a9a76832dbe
pragma solidity ^0.8.0;

/**
 * @dev String operations.
 */
library Hex {
    /**
     * @dev Converts a `uint256` to its `string` representation.
     */
    function toHexStr(uint256 i) internal pure returns (string memory) {
        if (i == 0) return "0";
        uint j = i;
        uint length;
        while (j != 0) {
            length++;
            j = j >> 4;
        }
        uint mask = 15;
        bytes memory bstr = new bytes(length);
        uint k = length;
        while (i != 0) {
            uint curr = (i & mask);
            bstr[--k] = curr > 9 ?
            bytes1(uint8(55 + curr)) :
            bytes1(uint8(48 + curr)); // 55 = 65 - 10
            i = i >> 4;
        }
        return string(bstr);
    }

}
