import React from 'react'
import {connect} from 'react-redux'
import * as actions from "@core/actions/app";

function Index({counter, increment, decrement}: any) {
    return (
        <div>
            <h1>{counter || 0}</h1>
            <button onClick={() => increment()}>Increment</button>
            <button onClick={() => decrement()}>Decrement</button>
        </div>
    )
}


export default connect(
    // @ts-ignore
    (state) => state.app,
    actions
)(Index)
