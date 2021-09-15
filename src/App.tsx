import React, { FC } from 'react'
import { withRouter } from 'react-router'
import { Routing } from '@src/navigation'
import { Provider } from 'react-redux'
import { store, history } from '@state/store'
import { ConnectedRouter } from 'connected-react-router/immutable'

import { ThemeProvider, createTheme, responsiveFontSizes } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { globalOverrides, defaultTheme, typography } from '@styles/theme'

const ConnectedApp = withRouter(Routing)
const theme = responsiveFontSizes(createTheme(
  Object.assign({}, globalOverrides, defaultTheme, typography)
))

/* eslint-disable  @typescript-eslint/explicit-function-return-type */
const App: FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConnectedApp />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  )
}

export default App
