import { Interface } from '@ethersproject/abi'
import WNFT from '@abi/WNFT.json'

export const RINKEBY_ALCHEMY_API_KEY = process.env.RINKEBY_ALCHEMY_API_KEY ?? ''

const WNFTAbi = new Interface(WNFT)
export { WNFTAbi, WNFT }
