# Include env file
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

.PHONY: test
test: deps
	npx hardhat test --network localhost

clean:
	rm -rf cache
	rm -rf artifacts
	rm -rf node_modules
	rm -rf yarn.lock
	docker-compose down

node_modules:
	# --legacy-peer-deps is required
	#  for now, hopefully not forever.
	npm install --legacy-peer-deps


deps: node_modules
	docker-compose up -d
	sleep 5
	npx hardhat deploy --network localhost

deploy-rinkeby:
	npx hardhat deploy --network rinkeby

deploy-kovan:
	npx hardhat deploy --network kovan

deploy-ropsten:
	npx hardhat deploy --network ropsten

deploy-all: rebuild deploy-rinkeby deploy-goerli deploy-kovan deploy-ropsten

rebuild: clean deps
