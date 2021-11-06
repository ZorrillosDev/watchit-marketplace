import { Ethers } from '@src/utils'
import {BigNumber} from "ethers";

describe('Ethers util', () => {
  it('should return expected ETH with decimal amount', () => {
    const wei = BigNumber.from('1000000000000000000')
    const expected = "1.00"

    expect(Ethers.getWeiToETH(wei, 2)).toBe(expected)
  })

})
