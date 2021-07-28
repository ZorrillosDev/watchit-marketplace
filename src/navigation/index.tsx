import React, { ReactElement } from 'react'
import Index from '@pages/Index'
import { Route, Switch } from 'react-router'

export const ROOT = '/'
export const Routing = (): ReactElement => {
  return (
    <Switch>
      <Route exact path={ROOT} component={Index} />
    </Switch>
  )
}
