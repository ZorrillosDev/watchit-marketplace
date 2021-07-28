import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import * as actions from '@core/actions/app'

function Index ({ counter, increment, decrement }: any): ReactElement {
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
    </div>
  )
}

export default connect(
  // @ts-expect-error
  (state) => state.app,
  actions
)(Index)
