/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import React from 'react'
// https://reactrouter.com/web/api/withRouter
import {withRouter} from 'react-router'
import {Provider} from 'react-redux'
import {Routing} from '@src/navigation'

import {ThemeProvider} from '@material-ui/core/styles'
// https://github.com/supasate/connected-react-router/blob/master/FAQ.md
import {ConnectedRouter} from 'connected-react-router/immutable'
import {createHashHistory} from 'history'
import createStore from '@state/store'
// https://github.com/NoahZinsmeister/web3-react/tree/v6/docs
import {Web3ReactProvider} from '@web3-react/core'
import * as web3Settings from '@src/web3'

// https://material-ui.com/es/customization/theming/
import {createTheme, responsiveFontSizes} from '@material-ui/core/styles';
// https://material-ui.com/es/components/css-baseline/
import CssBaseline from '@material-ui/core/CssBaseline';
import {globalOverrides, defaultTheme, typography} from "@styles/theme";

// @ts-expect-error
const initialState = window?.__INITIAL_STATE__ ?? {}
const ConnectedApp = withRouter(Routing)
const history = createHashHistory()
const store = createStore(history, initialState)
const theme = responsiveFontSizes(createTheme(
    Object.assign({}, globalOverrides, defaultTheme, typography)
));

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Web3ReactProvider {...web3Settings}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <ConnectedApp/>
                    </ConnectedRouter>
                </Provider>
            </Web3ReactProvider>
        </ThemeProvider>
    )
}

export default App
