/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {Routing} from '@src/navigation/Routing'
import {ThemeProvider} from '@material-ui/core/styles'
import store from '@redux/store'

const theme = {
    // Theme initial state
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routing/>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    )
}

export default App
