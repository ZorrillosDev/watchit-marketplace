/* global ethers */

async function main () {
  const [deployer] = await ethers.getSigners()

  console.log(
    'Deploying contracts with the account:',
    deployer.address
  )

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const Tokens = await ethers.getContractFactory('Token')
  const tokens = await Tokens.deploy()

  console.log('Tokens address:', tokens.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
