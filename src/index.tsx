import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from '@pages/login-view'
import Index from '@pages/index-view'
import { createBrowserHistory } from 'history'

const hist = createBrowserHistory({
  basename: '/', // The base URL of the app (see below)
  forceRefresh: false // Set true to force full page refreshes
})

/* eslint-disable  @typescript-eslint/explicit-function-return-type */
const App = () => {
  return (
    // @ts-expect-error
    <HashRouter history={hist}>
      <Switch>
        <Route
          exact path='/'
          render={(n) => <Login {...n} />}
        />
        <Route
          exact path='/app/index'
          render={(n) => <Index {...n} />}
        />
      </Switch>
    </HashRouter>
  )
}
/* eslint-enable  @typescript-eslint/explicit-function-return-type */

const root = document.getElementById('root')
ReactDOM.render(<App />, root)
