const { expect } = require('chai')
const CID = require('cids')
const {bs58toHex, hexToBs58, randomCID} = require('./index')

describe('Base 58 <--> Hex Conversion', function () {
  const str = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRST'

  it('"round trips" from bs58 to hex and back', async () => {
    const hex = bs58toHex(str)
    const b58 = hexToBs58(hex)

    expect(b58).to.equal(str)
  })
})

describe('Random CIDs', function () {
  const volume = 500
  const existingCIDs = new Set()

  it(`generates ${volume} random valid CIDs`, async () => {
    for(let i = 0; i < volume; i++) {
      const cid = await randomCID()

      if (existingCIDs.has(cid)) {
        expect.fail('Duplicate CID detected??')
      }

      existingCIDs.add(cid)
      expect(() => CID.validateCID(cid)).to.not.throw()
    }
  })
})
