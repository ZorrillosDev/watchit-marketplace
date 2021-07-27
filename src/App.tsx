/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {Router} from 'react-router-dom'
import React from 'react'
import {createMemoryHistory} from 'history'
import {Routing} from "@src/navigation/Routing";

const history = createMemoryHistory()

const App = () => {
    return (
        <Router history={history}>
            <Routing/>
        </Router>
    )
}

export default App
