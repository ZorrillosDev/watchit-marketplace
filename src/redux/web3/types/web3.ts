import { BigNumber } from 'ethers'

export interface Web3CallResult {
  blockHash: string
  blockNumber: number
  gasUsed: BigNumber
  status: number
  transactionHash: string
  to: string
}
