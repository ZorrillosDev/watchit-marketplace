import React, {FunctionComponent, ReactElement} from 'react'
import {Route, Switch} from 'react-router'
import Home from '@pages/Home'

export const ROOT = '/'
export const Routing: FunctionComponent = (): ReactElement => {
    return (
        <Switch>
            <Route exact path={ROOT} component={Home}/>
        </Switch>
    )
}
