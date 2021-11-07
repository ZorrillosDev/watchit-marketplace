/* eslint-disable  @typescript-eslint/no-namespace */

// @ts-expect-error
import cidTools from 'cid-tool'
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
    const base16: string = cidTools.format(cid, { base: 'base16' }).slice(1)
    return `0x${base16}`
  }

}
