import React from "react";
import Index from "@pages/Index";
import {Route, Switch} from "react-router-dom";
import {ROOT} from '@src/navigation/CONSTANTS'


export const Routing = () => {
    return (
        <Switch>
            <Route exact path={ROOT} component={Index}/>
        </Switch>
    )
}
