import React, {ReactElement} from "react";
import {RoundButton, Logo} from "@src/components";
import {Grid, Toolbar, AppBar} from "@material-ui/core";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import i18n from '@src/i18n';

export default function TopHeader(): ReactElement {
    return (
        <AppBar color={'default'}>
            <Toolbar>
                <Grid container>
                    <Grid sm={2}>
                        <Logo/>
                    </Grid>
                    <Grid md={4}>
                        {/* Search  */}
                    </Grid>
                    <Grid md={5}>
                        {/* Nav   */}
                    </Grid>
                    <Grid md={1}>
                        <RoundButton
                            variant={'contained'} color={'secondary'}
                            startIcon={<AccountBalanceWalletIcon fontSize={'inherit'}/>}
                        >
                            {i18n.t('GLOBAL_WALLET')}
                        </RoundButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
