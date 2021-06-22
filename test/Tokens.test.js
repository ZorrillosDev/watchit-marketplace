/* global ethers, upgrades */

const { expect } = require('chai')
const bs58 = require('bs58')

// see: https://github.com/mawrkus/js-unit-testing-guide
describe('Tokens', function () {
  if (process.env.TESTNET) {
    this.timeout(60000)
  }

  let tokensNF, tokensF
  let owner, addr1
  // Example token uri. CID is not valid one.
  // TODO: ERC1155 Metadata
  // see: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
  const tokenUriA = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwAWT'
  const tokenUriB = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRST'
  const tokenUriC = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRYU'
  const tokenUriD = 'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwRHJ'

  const toBase58 = (string) => `0x${Buffer.from(bs58.decode(string).slice(2)).toString('hex')}`
  const fromBase58 = (b58) => bs58.encode(Buffer.from(`1220${b58.slice(2)}`, 'hex'))

  const nftMinter = async function (tokenUri, minter = owner.address) {
    await tokensNF.mint(minter, toBase58(tokenUri), [])
    const nextTokenId = await tokensNF.nextTokenId()
    const uri = await tokensNF.getNFTUri(nextTokenId - 1)
    return [uri, nextTokenId]
  }

  // const deployContract = async (contractName) => {
  //   const _contractFactory = await ethers.getContractFactory(contractName)
  //   const _contract = await _contractFactory.deploy()
  //   await _contract.deployed()
  //   console.log(`${contractName} address: ${_contract.address}`)
  //   return _contract
  // }

  const deployProxyContract = async (contractName) => {
    const _contractFactory = await ethers.getContractFactory(contractName)
    const _contract = await upgrades.deployProxy(_contractFactory)
    await _contract.deployed()
    console.log(`${contractName} address: ${_contract.address}`)
    return _contract
  }

  before(async function () {
    [owner, addr1] = await ethers.getSigners()

    if (process.env.TESTNET && process.env.ROPSTEN_ACCOUNT1_KEY) {
      const provider = ethers.getDefaultProvider('ropsten', {
        alchemy: process.env.ALCHEMY_API_KEY
      })
      addr1 = new ethers.Wallet(process.env.ROPSTEN_ACCOUNT1_KEY, provider)
    }

    // Deploy FT and NFT contracts
    tokensNF = await deployProxyContract('NFToken')
    tokensF = await deployProxyContract('FToken')
    // tokens = await deployContract('Tokens')
    // const Tokens = await ethers.getContractFactory('Tokens')
  })

  // describe('Roles', function () {
  //   describe('DEFAULT_ADMIN_ROLE', function () {
  //
  //     it('can update the URI with proper permissions', async function () {
  //       // owner is the default ethers account but let's
  //       // call .connect explicitly here anyway
  //       await tokens.connect(owner).setURI(tokenUriA)
  //
  //       // TODO: Learn more about what all this means in the transaction result.
  //       // const result = await tokens.connect...
  //       // console.log(result)
  //     })
  //
  //     it('cannot update the URI without proper permissions', async function () {
  //       try {
  //         await tokens.connect(addr1).setURI(tokenUriA)
  //       } catch (err) {
  //         expect(err.message).to.contain('revert URI cannot be updated')
  //       }
  //     })
  //   })
  // })

  describe('NonFungibleTokens', function () {

    describe.skip('Upgradeable', function () {
      let v2NFT, v1NFT, currentNextId;
      before(async function () {
        // Mint for v1 must persist in v2 state
        v1NFT = await deployProxyContract('NFToken')
        await v1NFT.mint(owner.address, toBase58(tokenUriA), [])
        currentNextId = await v1NFT.nextTokenId();
        const v2Factory = await ethers.getContractFactory('NFTokenV2')
        v2NFT = await upgrades.upgradeProxy(v1NFT.address, v2Factory)
        v2NFT.attach(v1NFT.address)
      })

      it('should retrieve a NFT previously minted', async function () {
        const previousContractNextId = await v2NFT.nextTokenId()
        expect(previousContractNextId).to.equal(currentNextId)
      })

      it('should allow call added method in upgrade `myUpgradedTokenId`', async function () {
        const previousContractNextId = await v2NFT.myUpgradedTokenId()
        expect(previousContractNextId).to.equal(currentNextId)
      })

      it('should cannot upgrade if not owner', async function () {
        try {
          const v2Factory = await ethers.getContractFactory('NFTokenV2', { signer: addr1 })
          await upgrades.upgradeProxy(v1NFT.address, v2Factory)
        } catch (err) {
          expect(err.message).to.contain('Ownable: caller is not the owner')
        }
      })
    })

    describe('Roles', function () {
      describe('NFT_MINTER_ROLE', function () {
        it('cannot mint NFT without proper permissions', async function () {
          try {
            await tokensNF.connect(addr1).mint(owner.address, toBase58(tokenUriA), [])
          } catch (err) {
            expect(err.message).to.contain('NFT cannot be created')
          }
        })
      })

      describe('DEFAULT_ADMIN_ROLE', function () {
        it('can burn NFT with proper permissions', async function () {
          // owner is the default ethers account but let's
          // call .connect explicitly here anyway
          await tokensNF.mint(owner.address, toBase58(tokenUriA), [])
          const nextTokenId = await tokensNF.nextTokenId()
          await tokensNF.burn(owner.address, nextTokenId - 1)
        })

        it('cannot burn NFT without proper permissions', async function () {
          try {
            const [_, nextTokenId] = await nftMinter(tokenUriA) //eslint-disable-line
            await tokensNF.connect(addr1).burn(owner.address, nextTokenId - 1)
          } catch (err) {
            expect(err.message).to.contain('NFT cannot be burned')
          }
        })
      })
    })

    describe('Burn', function () {
      it('should decrement balance after burn NFT ', async function () {
        await tokensNF.mint(addr1.address, toBase58(tokenUriA), [])
        const nextTokenId = await tokensNF.nextTokenId()
        const currentTokenId = nextTokenId - 1
        await tokensNF.connect(owner).burn(addr1.address, currentTokenId) // Burn token
        const newBurnedBalance = await tokensNF.balanceOf(addr1.address, currentTokenId)
        expect(newBurnedBalance.toString()).to.equal('0')
      })
    })

    describe('Mint', function () {
      it('should mint NFT valid mapping CID', async function () {
        const [tokenUriAResult, tokenIdA] = await nftMinter(tokenUriA)
        const [tokenUriBResult, _] = await nftMinter(tokenUriB) // eslint-disable-line
        const rawFetchA = await tokensNF.getNFTUri(tokenIdA - 1) // nextTokenId 2 - 1 = 1 to check before id
        const rawFetchB = await tokensNF.getNFTUri(tokenIdA) // eg. nextTokenId 2

        expect(fromBase58(tokenUriAResult)).to.equal(tokenUriA)
        expect(fromBase58(tokenUriBResult)).to.equal(tokenUriB)
        expect(fromBase58(rawFetchA)).to.equal(tokenUriA)
        expect(fromBase58(rawFetchB)).to.equal(tokenUriB)
      })

      it('should mint NFT batch', async function () {
        const uris = [tokenUriA, tokenUriB, tokenUriC, tokenUriD]
        const initialTokenId = await tokensNF.nextTokenId()
        await tokensNF.mintBatch(owner.address, uris.map(toBase58), [])
        const nextTokenId = await tokensNF.nextTokenId()

        const rawFetchA = await tokensNF.getNFTUri(nextTokenId - 4) // nextTokenId 4 - 4 = 0 first uri index
        const rawFetchB = await tokensNF.getNFTUri(nextTokenId - 3) // eg. nextTokenId  4 -3 = 1 second uri index
        expect(fromBase58(rawFetchA)).to.equal(tokenUriA)
        expect(fromBase58(rawFetchB)).to.equal(tokenUriB)
        expect(nextTokenId).to.equal(initialTokenId.add(uris.length))
      })
    })

    describe('Transfer', function () {
      it('should be transferable', async function () {
        const [_, tokenIdA] = await nftMinter(tokenUriA) // eslint-disable-line
        const currentToken = tokenIdA - 1
        await tokensNF.connect(owner).transfer(owner.address, addr1.address, currentToken, [])
        const isOwner = await tokensNF.connect(addr1).isOwnerOf(currentToken)
        expect(isOwner.toString()).to.equal('true')
      })

      it('should fail for try to transfer not owned NFT', async function () {
        try {
          const [_, tokenIdA] = await nftMinter(tokenUriA) // eslint-disable-line
          const currentToken = tokenIdA - 1
          await tokensNF.connect(addr1).transfer(addr1.address, owner.address, currentToken, [])
        } catch (err) {
          expect(err.message).to.contain('Only owner can transfer NFT')
        }
      })
    })

    describe('Query', function () {
      it('should retrieve NFT uri only by owner', async function () {
        try {
          // Minter by default owner
          const [_, tokenIdA] = await nftMinter(tokenUriA) // eslint-disable-line
          await tokensNF.connect(addr1).getNFTUri(tokenIdA)
        } catch (err) {
          expect(err.message).to.contain('Only owner can view NFT url')
        }
      })

      it('should fail if NFT doesnt exist in collection', async function () {
        const isValidNFT = await tokensNF.isValidNFT(1000000000)
        expect(isValidNFT.toString()).to.equal('false')
      })

      it('should not fail if NFT exist in collection', async function () {
        const [_, tokenIdA] = await nftMinter(tokenUriA) // eslint-disable-line
        const isValidNFT = await tokensNF.isValidNFT(tokenIdA - 1)
        expect(isValidNFT.toString()).to.equal('true')
      })
    })
  })

  describe('FungibleTokens', function () {
    describe.skip('Upgradeable', function () {

        let v2NFT, v1NFT, currentNextId;
        before(async function () {
          // Mint for v1 must persist in v2 state
          v1NFT = await deployProxyContract('FToken');
          await v1NFT.mint(owner.address, 1, []);
          currentNextId = await v1NFT.nextTokenId(); // v1 currentNextId
          const v2Factory = await ethers.getContractFactory('FTokenV2');
          v2NFT = await upgrades.upgradeProxy(v1NFT.address, v2Factory);
          v2NFT.attach(v1NFT.address);
        })

      it('should retrieve a NFT previously minted', async function () {
        const previousContractNextId = await v2NFT.nextTokenId()
        const previousBalance = await v2NFT.balanceOf(owner.address, currentNextId - 1)
        expect(previousContractNextId).to.equal(currentNextId)
        expect(previousBalance).to.equal('1')
      })

      it('should allow call added method in upgrade `myUpgradedTokenId`', async function () {
        const previousContractNextId = await v2NFT.myUpgradedTokenId()
        expect(previousContractNextId).to.equal(currentNextId)
      })

      it('should cannot upgrade if not owner', async function () {
        try {
          const v1NFT = await deployProxyContract('FToken')
          const v2Factory = await ethers.getContractFactory('FTokenV2', { signer: addr1 })
          await upgrades.upgradeProxy(v1NFT.address, v2Factory)
        } catch (err) {
          expect(err.message).to.contain('Ownable: caller is not the owner')
        }
      })
    })

    describe('Mint', function () {
      it('should increments the nextTokenId after each mint', async function () {
        const initialTokenId = await tokensF.nextTokenId()
        await tokensF.mint(owner.address, 1, [])
        const nextTokenId = await tokensF.nextTokenId()
        expect(nextTokenId).to.equal(initialTokenId.add(1))
      })

      it('should increments nextTokenId properly after batch mint', async function () {
        const initialTokenId = await tokensF.nextTokenId()
        const amounts = [
          1,
          10,
          100,
          10000000,
          '1000000000000000'
        ]

        await tokensF.mintBatch(owner.address, amounts, [])
        const nextTokenId = await tokensF.nextTokenId()
        expect(nextTokenId).to.equal(initialTokenId.add(amounts.length))
      })
    })
  })
})
