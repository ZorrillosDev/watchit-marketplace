// react imports
import React, { FC, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

// project imports
import { Routing } from '@src/navigation'
import { store, history } from '@state/store'
import { darkTheme, defaultTheme, ColorModeContext } from '@styles/theme'

// mui imports
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { PaletteMode } from '@mui/material'
import { DAppProvider } from '@usedapp/core'
import { config } from '@src/w3/'
// ===========================|| MAIN APP ||=========================== //

const ConnectedApp = withRouter(Routing)

const App: FC = (): JSX.Element => {
  // saved local storage theme or default light theme
  const defaultMode = (localStorage.getItem('theme') as PaletteMode ?? 'light')

  // theme control state
  const [mode, setMode] = React.useState<PaletteMode>(defaultMode)
  const colorMode = React.useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'))
    }
  }), [])

  const theme = React.useMemo(() => {
    const config = Object.is(mode, 'light')
      ? defaultTheme
      : darkTheme

    return responsiveFontSizes(createTheme(config))
  }, [mode])

  // save in local storage theme changes
  useEffect(() => {
    localStorage.setItem('theme', mode)
  }, [mode])

  return (
    <DAppProvider config={config}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <ConnectedApp />
            </ConnectedRouter>
          </Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </DAppProvider>
  )
}

export default App
