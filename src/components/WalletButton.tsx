import { useTranslation } from 'react-i18next'
import { useWeb3React } from '@web3-react/core'
import { RoundButton } from '@components/index'
import React, { FunctionComponent, ReactElement } from 'react'
import { connect, RootStateOrAny } from 'react-redux'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import { useMetamaskListener, useMetamaskEager } from '@hooks/WalletHooks'
import * as walletActions from '@state/actions/WalletActions'
import { Injected } from '@src/web3'

const WalletButton: FunctionComponent = ({ wallet, connect, connected }: any): ReactElement => {
  const { t } = useTranslation()
  const { activate } = useWeb3React()

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useMetamaskEager()
  const requestConnection = !triedEager || !!wallet.connecting

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useMetamaskListener(requestConnection)

  return (
    <RoundButton
      variant='contained' color='secondary'
      startIcon={<AccountBalanceWalletIcon fontSize='inherit' />}
      onClick={async () => {
        connect()
        await activate(Injected)
      }}
    >
      {wallet.connecting ? t('GLOBAL_CONNECTING') : t('GLOBAL_WALLET')}
    </RoundButton>
  )
}

const mapDispatchToProps = {
  connect: walletActions.connect,
  connected: walletActions.connected,
  error: walletActions.error
}

const mapStateToProps = (state: RootStateOrAny): any => {
  return {
    wallet: state.wallet
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletButton)
