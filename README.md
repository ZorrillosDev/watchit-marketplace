# Watchit Marketplace
[![Tests](https://github.com/ZorrillosDev/watchit-marketplace/actions/workflows/tests.yml/badge.svg)](https://github.com/ZorrillosDev/watchit-marketplace/actions/workflows/tests.yml)
>In the traditional movie and television industry, studios create video content, in the form of series and films, which are then picked up by distributors, who provide the infrastructure to deliver the content to viewers. Oftentimes, producers will fund projects that are pitched to them by the other parties.
> 
>Within watchit marketplace, each creator has tools to create, monetize and promote their content, the creator is able to upload their film to the marketplace where it can be evaluated by content distributors who can acquire this content for distribution without intermediaries. Through the use of smart contracts and the blockchain, transactions between the parties occur directly. The marketplace is a means for both parties to meet and offers a healthy business environment.

[![screenshot](src/assets/img/screenshot_1.png?raw=true)]()
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
>* NFT: https://rinkeby.etherscan.io/address/0x4C19692E17D96D4dcb93A09b01701B24aEB27633
>* FT: https://rinkeby.etherscan.io/address/0x2056e4e85a8e725aa0a184A741eA309F4766073C
>* PG: https://rinkeby.etherscan.io/address/0x6A815e663c6395bcb92e4C17735c9424A846064C
>
>#### Kovan
>
>* NFT: https://kovan.etherscan.io/address/0xED92FaC63bac12aFf786417b021bDcd28b6E5385
>* FT: https://kovan.etherscan.io/address/0xDE312402930ed79DF40ed27296d0a61E1D179E57
>* PG: https://kovan.etherscan.io/address/0x1b0Cd770a016e99Aa6B224aB0041201dAEC3Ca47
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


### Gitpod

To run a fast and fully initialized set-up dev environment
just go to our `ready-to-code` [gitpod](https://gitpod.io/#https://github.com/ZorrillosDev/watchit-marketplace)

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
