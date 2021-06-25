const { ethers, upgrades } = require('hardhat')

async function main () {
  const NFToken = await ethers.getContractFactory('NFToken')
  const nftoken = await upgrades.deployProxy(NFToken)

  process.stdout.write(nftoken.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
