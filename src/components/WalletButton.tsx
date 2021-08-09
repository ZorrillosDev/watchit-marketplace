import {useTranslation} from 'react-i18next'
import {RoundButton} from '@components/index'
import React, {FunctionComponent, ReactElement} from 'react'
import {connect, RootStateOrAny} from 'react-redux'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import {useWeb3React} from "@web3-react/core";

const WalletButton: FunctionComponent = ({connectWallet, wallet}: any): ReactElement => {
    const {t} = useTranslation()
    const web3 = useWeb3React()

    return (
        <RoundButton
            variant='contained' color={'secondary'}
            startIcon={<AccountBalanceWalletIcon fontSize='inherit'/>}
            onClick={() => connectWallet(web3)}
        >
            {wallet.connecting ? t('GLOBAL_CONNECTING') : t('GLOBAL_WALLET')}
        </RoundButton>
    )
}


const mapStateToProps = (state: RootStateOrAny) => {
    return {
        wallet: state.wallet
    }
}

export default connect(
    mapStateToProps
)(WalletButton)


