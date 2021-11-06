import {AccountBalanceWallet} from '@components/Icons'
import React, {FC, useState} from 'react'
import i18n from '@src/i18n'
import {Button} from '@mui/material'
import {PixelArtIdenticon} from '@components/Identicon'
import {useMetamask} from "@hooks/useMetamask";

const WalletButton: FC = (): JSX.Element => {
    const [error, setError] = useState(false)
    const {active, account, activate} = useMetamask()
    const icon: JSX.Element = active
        ? <PixelArtIdenticon seed={account ?? ''}/>
        : <AccountBalanceWallet fontSize='inherit'/>

    async function connect(): Promise<void> {
        try {
            if (!active)
                await activate()
        } catch (ex) {
            setError(true)
        }
    }

    return (
        <Button
            sx={{
                mt: {xs: 1, md: 0},
                ml: {xs: 0, md: 1},
                borderRadius: 3
            }}
            variant='contained'
            color={error ? 'error' : 'primary'}
            startIcon={icon}
            onClick={connect}
        >
            {
                (active && !error)
                    ? 'Connected'
                    : error
                        ? 'Oops'
                        : i18n.t('GLOBAL_WALLET')

            }
        </Button>
    )
}

export default WalletButton
