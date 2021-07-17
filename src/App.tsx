/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {Router, Route} from 'react-router-dom';
import Index from "./pages/Index";
import React from "react";
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

const App = () => {
    return (
        <Router history={history}>
            <Route exact path='/'>
                <Index/>
            </Route>
        </Router>
    )
}

export default App;
