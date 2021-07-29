import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'

export const getLibrary = (provider?: any): Web3Provider =>
  new ethers.providers.Web3Provider(provider)
