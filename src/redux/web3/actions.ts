import { ThunkAction, ThunkDispatcher } from '@state/types'
import { Web3CallResult, Web3SafePurchaseArgs, Web3SetApprovalForArgs } from '@state/web3/types'
import { setCallResult } from '@state/web3/reducer'
import { callSafePurchase, callSetApprovalFor } from '@w3/calls/nft'
<<<<<<< HEAD

export { setCallResult } from '@state/web3/reducer'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

=======

export { setCallResult } from '@state/web3/reducer'
>>>>>>> main
export const setApprovalFor = <P extends Web3SetApprovalForArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const result: Web3CallResult = await callSetApprovalFor(params)
      dispatch(setCallResult(result))
    } catch (e) {
      // If any issue we check if response is received if not just send empty object
      dispatch(setCallResult({ status: 0 } as Web3CallResult))
    }
  }
}

export const safePurchase = <P extends Web3SafePurchaseArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const result: Web3CallResult = await callSafePurchase(params)
      dispatch(setCallResult(result))
    } catch (e) {
      // If any issue we check if response is received if not just send empty object
      dispatch(setCallResult({ status: 0 } as Web3CallResult))
    }
  }
}
