import i18n from '@src/i18n'
import React, { FunctionComponent, ReactElement } from 'react'
import { RoundButton } from '@components/index'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'

const WalletButton: FunctionComponent = (): ReactElement => (
  <RoundButton
    variant='contained' color='secondary'
    startIcon={<AccountBalanceWalletIcon fontSize='inherit' />}
  >
    {i18n.t('GLOBAL_WALLET')}
  </RoundButton>
)

export default WalletButton
