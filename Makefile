export SHELL:=/bin/bash

.ONESHELL:

# Include env file
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

.PHONY: test
test:
	docker-compose up -d
	export LOCALHOST_CONTRACT_FT=`npx hardhat run --network localhost scripts/deploy-ft.js | tail -1`
	export LOCALHOST_CONTRACT_NFT=`npx hardhat run --network localhost scripts/deploy-nft.js | tail -1`
	npx hardhat test --network localhost
	docker-compose down

clean:
	rm -rf cache
	rm -rf artifacts
	rm -rf node_modules
	rm -rf package-lock.json

deps:
	# --legacy-peer-deps is required
	#  for now, hopefully not forever.
	npm install --legacy-peer-deps
	npx hardhat compile


deploy-rinkeby:
	npx hardhat run ./scripts/deploy-ft.js --network rinkeby
	npx hardhat run ./scripts/deploy-nft.js --network rinkeby

deploy-goerli:
	npx hardhat run ./scripts/deploy-ft.js --network goerli
	npx hardhat run ./scripts/deploy-nft.js --network goerli

deploy-kovan:
	npx hardhat run ./scripts/deploy-ft.js --network kovan
	npx hardhat run ./scripts/deploy-nft.js --network kovan

deploy-ropsten:
	npx hardhat run ./scripts/deploy-ft.js --network ropsten
	npx hardhat run ./scripts/deploy-nft.js --network ropsten

deploy-all: clean deploy-rinkeby deploy-goerli deploy-kovan deploy-ropsten


upgrade-rinkeby:
	npx hardhat run ./scripts/upgrade-ft.js --network rinkeby
	npx hardhat run ./scripts/upgrade-nft.js --network rinkeby

upgrade-goerli:
	npx hardhat run ./scripts/upgrade-ft.js --network goerli
	npx hardhat run ./scripts/upgrade-nft.js --network goerli

upgrade-kovan:
	npx hardhat run ./scripts/upgrade-ft.js --network kovan
	npx hardhat run ./scripts/upgrade-nft.js --network kovan

upgrade-ropsten:
	npx hardhat run ./scripts/upgrade-ft.js --network ropsten
	npx hardhat run ./scripts/upgrade-nft.js --network ropsten

upgrade-all: clean upgrade-rinkeby upgrade-goerli upgrade-kovan upgrade-ropsten

rebuild: clean deps
