import actions from '@redux/actions/app'

interface Action {
  payload: number
  type: string
}

interface CounterState {
  counter: number
}

const initialState: CounterState = {
  counter: 0
}

export const appReducer = (state: CounterState = initialState, action: Action): CounterState => {
  switch (action.type) {
    case actions.INCREMENT:
      return {
        ...state,
        counter: state.counter + action.payload
      }
    case actions.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      }
    default:
      return state
  }
}
