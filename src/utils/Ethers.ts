/* eslint-disable  @typescript-eslint/no-namespace */

import { CID } from 'multiformats/cid'
import { base16 } from 'multiformats/bases/base16'
import { BigNumber, ethers } from 'ethers'

export namespace Ethers {
  export function getWeiToETH (wei: BigNumber, decimals: number = 2): string {
    const eth = ethers.utils.formatEther(wei)
    return (+eth).toFixed(decimals)
  }

  export function cidToUint256 (cid: string): string {
    /**
     * From V1 cid to base16
     * @param: cid
     * @return {string}
     */
    const cidV1: CID = CID.parse(cid)
    const parsedBase16: string = cidV1.toString(base16)
    return `0x${parsedBase16.slice(1)}`
  }

}
