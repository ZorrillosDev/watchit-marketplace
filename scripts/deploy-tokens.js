/* global ethers */

async function main () {
  // We get the contract to deploy
  const Tokens = await ethers.getContractFactory('Tokens')
  const tokens = await Tokens.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3')

  setTimeout(() => console.log(tokens.filters.Initialize()), 5000)
}

main()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
