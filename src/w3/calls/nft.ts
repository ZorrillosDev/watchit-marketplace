import { Contract } from '@ethersproject/contracts'
import { WNFT } from '@w3/CONSTANTS'
import { BigNumber } from 'ethers'
import { getDefaultProvider, getNetworkSettings } from '@src/w3'
import { Web3SetApprovalForArgs } from '@state/web3/types'

/* eslint-disable  @typescript-eslint/return-await */

export async function callSetApprovalFor (params: Web3SetApprovalForArgs): Promise<any> {
  const networkSettings = getNetworkSettings()
  const signer = getDefaultProvider().getSigner()
  const contract = new Contract(networkSettings.NFT, WNFT, signer)
  const { operator, tokenId, approved } = params

  return await (await contract.setApprovalFor(
    operator,
    BigNumber.from(tokenId),
    BigNumber.from(approved)
  )).wait()
}
