import {useTranslation} from 'react-i18next';
import React, {FunctionComponent, ReactElement} from 'react'
import {RoundButton} from '@components/index'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'

const WalletButton: FunctionComponent = (props: any): ReactElement => {
    const {t} = useTranslation()
    return <RoundButton
        variant='contained' color='secondary'
        startIcon={<AccountBalanceWalletIcon fontSize='inherit'/>}
    >
        {t('GLOBAL_WALLET')}
    </RoundButton>
}


export default WalletButton
