import { Contract } from '@ethersproject/contracts'
import { WNFT } from '@w3/CONSTANTS'
import { BigNumber, ethers } from 'ethers'
import { getDefaultProvider, getNetworkSettings } from '@src/w3'
import { Web3SafePurchaseArgs, Web3SetApprovalForArgs } from '@state/web3/types'

/* eslint-disable  @typescript-eslint/return-await */

export async function callSetApprovalFor (params: Web3SetApprovalForArgs): Promise<any> {
  const networkSettings = getNetworkSettings()
  const signer = getDefaultProvider().getSigner()
  const contract = new Contract(networkSettings.NFT, WNFT, signer)
  const { operator, tokenId, approved } = params

    return await (await contract.setApprovalFor(
        operator,
        BigNumber.from(tokenId),
        ethers.utils.parseEther(approved)
    )).wait()
}

export async function callSafePurchase(params: Web3SafePurchaseArgs): Promise<any> {
    const networkSettings = getNetworkSettings()
    const signer = getDefaultProvider().getSigner()
    const contract = new Contract(networkSettings.NFT, WNFT, signer)
    const {tokenId} = params

    return await (await contract.safePurchase(
        BigNumber.from(tokenId),
        {value: ethers.utils.parseEther(params.value ?? '0')}
    )).wait()
}
