import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router'
import Index from '@pages/Index'
import { createBrowserHistory } from 'history'

const hist = createBrowserHistory({
  basename: '/', // The base URL of the app (see below)
  forceRefresh: false // Set true to force full page refreshes
})

/* eslint-disable  @typescript-eslint/explicit-function-return-type */
const App = () => {
  return (
    <Router history={hist}>
      <Switch>
        <Route exact path='/'>
          <Index />
        </Route>
      </Switch>
    </Router>
  )
}
/* eslint-enable  @typescript-eslint/explicit-function-return-type */

const root = document.getElementById('root')
ReactDOM.render(<App />, root)
