.PHONY: test

test:
	npx hardhat node &
	# Deploy Fungible Token
	export LOCALHOST_CONTRACT_FT=`npx hardhat run --network localhost scripts/deploy-ft.js | tail -1` \
		&& export LOCALHOST_CONTRACT_NFT=`npx hardhat run --network localhost scripts/deploy-nft.js | tail -1` \
		&& npx hardhat test --network localhost
	kill `lsof -i:8545 -t`
