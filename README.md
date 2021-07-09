# Watchit Marketplace

>In the traditional movie and television industry, studios create video content, in the form of series and films, which are then picked up by distributors, who provide the infrastructure to deliver the content to viewers. Oftentimes, producers will fund projects that are pitched to them by the other parties.
> 
>Within watchit marketplace, each creator has tools to create, monetize and promote their content, the creator is able to upload their film to the marketplace where it can be evaluated by content distributors who can acquire this content for distribution without intermediaries. Through the use of smart contracts and the blockchain, transactions between the parties occur directly. The marketplace is a means for both parties to meet and offers a healthy business environment.

[![screenshot](src/app/media/img/screenshot_1.png?raw=true)]()
## Addresses
><details>
>  <summary>Addresses</summary>
>
>#### Ropsten
>
>* NFT: https://ropsten.etherscan.io/address/0x9d37d9572396b7CB3DAc0bB89F0577599b405073
>* FT: https://ropsten.etherscan.io/address/0x1f9BD812E5DD4E50020028522342236C7876BFfD
>
>#### Rinkeby
>
>* NFT: https://rinkeby.etherscan.io/address/0x343Fba94eb620dbEAB34eC6d6579e4A1745C9C00
>* FT: https://rinkeby.etherscan.io/address/0x14925Cc9dEC567d35116DB2750A1f8dbf1cAFFfE
>
>#### Goerli
>
>* NFT: https://goerli.etherscan.io/address/0x24515E4D1ad962b464b4590BE45c440f53cB8D59
>* FT: https://goerli.etherscan.io/address/0x46D198a4ab57e32Bd86730cf42a6Ae0e252ee15E
>
>#### Kovan
>
>* NFT: https://kovan.etherscan.io/address/0x24E9Dea8DA6aF8704367678ee8D31B7F350CeC99
>* FT: https://kovan.etherscan.io/address/0x61286E2665AF720E9341a3839B29940190FFf142
></details>

## Technical Concepts
><details>
>  <summary>Video Content</summary>
>The video must be in the platform's admissible format, either .mp4, .mov or .wmv. Each video must be in a resolution no less than 720p and may have a maximum resolution of 3840 × 2160 (4K).
>Each video will be processed transcoded to the .m3u8 format which will be transmitted through the HLS mechanism on the different platforms of the application.
></details>

><details>
>  <summary>Lazy Minting</summary>
>Content should be uploaded and processed but not minted until purchased, thus saving transaction fees.
></details>

## Install

```bash
$ npm i -g hardhat-shorthand
$ npm install
```

## Usage

#### Hardhat

This repository uses [Hardhat](https://hardhat.org/guides/shorthand.html).

```bash
$ hh compile
$ hh test
```


#### Test

Use this command to test all components of UI using [Jestjs](https://jestjs.io/).

```bash
$ npm run test:ui
```

#### Linting

Use this command to check all coding conventions issues using [standard-js](https://standardjs.com/) and [ts-standard](https://github.com/standard/ts-standard).

```bash
$ npm run lint:js:fix
```

#### Watch

Use this command to maintain building the project using [webpack](https://webpack.js.org/).

```bash
$ npm run watch:ui
```

#### Build

Use this command to build the project using [webpack](https://webpack.js.org/).

```bash
$ npm run build:ui
```

#### Start

Use this command to start the development server using [webpack](https://webpack.js.org/).

```bash
$ npm run start:ui
```

## Team

>We are a group of enthusiastic developers and movie lovers, with the vision of making the world of cinema an inclusive world. Our motto is "The right for what you have created, should always be your right"

etc...

More TBD
