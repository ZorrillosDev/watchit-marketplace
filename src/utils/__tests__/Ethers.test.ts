import { Ethers } from '@src/utils';
import { BigNumber } from 'ethers';

describe('Ethers util', () => {
  it('should return expected ETH with decimal amount', () => {
    const wei = BigNumber.from('1000000000000000000');
    const expected = '1.00';

    expect(Ethers.getWeiToETH(wei, 2)).toBe(expected);
  });

  it('should return expected uint256 from V1 cid', () => {
    const v1 = 'bafkzvzacdkm3bu3t266ivacqjowxqi3hvpqsyijxhsb23rv7nj7a';
    const expected = '0x01559ae4021a99b0d373d7bc8a80504bad782367abe12c21373c83adc6bf6a7e';

    expect(Ethers.cidToUint256(v1)).toBe(expected);
  });
});
