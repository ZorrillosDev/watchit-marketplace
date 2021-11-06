/* eslint-disable  @typescript-eslint/no-namespace */

import {BigNumber, ethers} from "ethers";

export namespace Ethers {
    export function getWeiToETH(wei: BigNumber, decimals: number = 2): string {
        const eth = ethers.utils.formatEther(wei)
        return (+eth).toFixed(decimals)
    }
}
