const { ethers, upgrades } = require('hardhat')

async function main () {
  const FToken = await ethers.getContractFactory('FToken')
  const ftoken = await upgrades.deployProxy(FToken)

  process.stdout.write(ftoken.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
