import React, {FunctionComponent, ReactElement} from "react";
import {WalletButton, Logo} from "@src/components";
import {Grid, Toolbar, AppBar} from "@material-ui/core";

const TopHeader: FunctionComponent = (): ReactElement => (
    <AppBar color={'default'}>
        <Toolbar>
            <Grid container>
                <Grid item sm={2}>
                    <Logo/>
                </Grid>
                <Grid item md={4}>
                    {/* Search  */}
                </Grid>
                <Grid item md={5}>
                    {/* Nav   */}
                </Grid>
                <Grid item md={1}>
                    <WalletButton/>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
)

export default TopHeader;
