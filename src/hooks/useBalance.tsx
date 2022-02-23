import { useWeb3React } from '@web3-react/core';
import {useEffect, useState} from 'react'
import {Ethers} from "@src/utils";

export function useBalance(): number {
    const {library, account} = useWeb3React()
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        if (library === undefined || account === undefined) {
            setBalance(0)
            return
        }

        library?.getBalance(account).then((value:any) => {
            setBalance(
                parseFloat(
                    Ethers.getWeiToETH(value)
                )
            )
        }).catch((error:any) => {
            console.log(error)
        })
    })

    return balance
}
