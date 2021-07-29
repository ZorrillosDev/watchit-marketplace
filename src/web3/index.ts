import {ethers} from "ethers";
export const getLibrary = (provider?: any)=>
    new ethers.providers.Web3Provider(provider)
