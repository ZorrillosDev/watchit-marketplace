# Include env file
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

.PHONY: test
test: node_modules
	npx hardhat test --network localhost

clean:
	rm -rf cache
	rm -rf artifacts
	rm -rf node_modules
	rm -rf deployments
	rm -rf abi
	rm -rf ipfs
	rm -rf package-lock.json

node_modules:
	# --legacy-peer-deps is required
	#  for now, hopefully not forever.
	npm install --legacy-peer-dep



deploy-rinkeby:
	npx hardhat deploy --network rinkeby

deploy-kovan:
	npx hardhat deploy --network kovan

deploy-ropsten:
	npx hardhat deploy --network ropsten

deploy-all: rebuild deploy-rinkeby deploy-goerli deploy-kovan deploy-ropsten

rebuild: clean deps
