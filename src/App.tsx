/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Routing} from "@src/navigation/Routing";
import 'fontsource-roboto';

const App = () => {
    return (
        <BrowserRouter>
            <Routing/>
        </BrowserRouter>
    )
}

export default App
