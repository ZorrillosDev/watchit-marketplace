/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {Routing} from '@src/navigation/Routing'
import store from '@redux/store'

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routing/>
            </BrowserRouter>
        </Provider>
    )
}

export default App
