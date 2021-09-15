import React, { FC } from 'react'
import RoundButton from '@components/Button/RoundButton'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import i18n from '@src/i18n'

const WalletButton: FC = (): JSX.Element => {
  return (
    <RoundButton
      variant='contained' color='primary'
      startIcon={<AccountBalanceWalletIcon fontSize='inherit' />}
    >
      {i18n.t('GLOBAL_WALLET')}
    </RoundButton>
  )
}

export default WalletButton
