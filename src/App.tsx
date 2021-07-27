/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import { Router, Route, Switch } from 'react-router-dom'
import Index from './pages/Index'
import React from 'react'
import { createMemoryHistory } from 'history'

const history = createMemoryHistory()

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/'>
          <Index />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
