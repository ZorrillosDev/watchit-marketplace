.PHONY: test

test:
	npx hardhat node &
	npx hardhat test --network localhost
	kill `lsof -i:8545 -t`
