/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Index from "./pages/Index";
import React from "react";


const App = () => {
    return (
        <Router>
            <Route exact path='/'>
                <Index/>
            </Route>
        </Router>
    )
}

export default App;
