import {Interface} from '@ethersproject/abi'
import WNFT from '@abi/WNFT.json'

export const RINKEBY_ALCHEMY_API_KEY = process.env.RINKEBY_ALCHEMY_API_KEY ?? ''
export const BLACK_HOLE = '0x0000000000000000000000000000000000000000'
const WNFTAbi = new Interface(WNFT)
export { WNFTAbi, WNFT }
