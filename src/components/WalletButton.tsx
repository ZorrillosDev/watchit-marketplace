import { AccountBalanceWallet } from '@components/Icons'
import { useWeb3React } from '@web3-react/core'
import React, { FC, useState } from 'react'
import i18n from '@src/i18n'
import { Button } from '@mui/material'
import { Injected } from '@src/w3'
import { PixelArtIdenticon } from '@components/Identicon'

const WalletButton: FC = (): JSX.Element => {
  const [error, setError] = useState(false)
  const { active, account, activate, deactivate } = useWeb3React()
  const icon: JSX.Element = active
    ? <PixelArtIdenticon seed={account ?? ''} />
    : <AccountBalanceWallet fontSize='inherit' />

  async function connect (): Promise<void> {
    try {
      if (active) return deactivate()
      await activate(Injected)
    } catch (ex) {
      setError(true)
    }
  }

  return (
    <Button
      sx={{
        mt: { xs: 1, md: 0 },
        ml: { xs: 0, md: 1 },
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
          : !active && error
            ? 'Oops'
            : i18n.t('GLOBAL_WALLET')

      }
    </Button>
  )
}

export default WalletButton
