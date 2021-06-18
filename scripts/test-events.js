/* global ethers */

async function main () {
  const Tokens = await ethers.getContractFactory('Tokens')
  console.log(Tokens)
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(process.exit())
