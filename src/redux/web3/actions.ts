import {ThunkAction, ThunkDispatcher} from '@state/types'
import {Web3CallResult, Web3SetApprovalForArgs} from "@state/web3/types";
import {setCallResult} from "@state/web3/reducer";
import {callSetApprovalFor} from "@w3/calls/nft";

export {setCallResult} from '@state/web3/reducer'
export const setApprovalFor = <P extends Web3SetApprovalForArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const result: Web3CallResult = await callSetApprovalFor(params)
      dispatch(setCallResult(result))
    } catch (e) {
      // If any issue we check if response is received if not just send empty object
      dispatch(setCallResult({status: 0} as Web3CallResult))
    }
  }
}
