/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import React from 'react'
// https://reactrouter.com/web/api/withRouter
import { withRouter } from 'react-router'
import { Provider } from 'react-redux'
import { Routing } from '@src/navigation'
import { ThemeProvider } from '@material-ui/core/styles'
// https://github.com/supasate/connected-react-router/blob/master/FAQ.md
import { ConnectedRouter } from 'connected-react-router/immutable'
import { createHashHistory } from 'history'
import createStore from '@core/store'

// @ts-expect-error
const initialState = window?.__INITIAL_STATE__ ?? {}
const ConnectedApp = withRouter(Routing)
const history = createHashHistory()
const store = createStore(history, initialState)
const theme = { /* Theme initial state */}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConnectedApp />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  )
}

export default App
