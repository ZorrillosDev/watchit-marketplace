// import 'v8-compile-cache'
import React from 'react'
import ReactDOM from 'react-dom'
import * as sw from '@public/sw'
import App from './App'

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
sw.register();
