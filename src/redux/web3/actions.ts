import { ThunkAction, ThunkDispatcher } from '@state/types'
import { Web3CallResult, Web3SafePurchaseArgs, Web3SetApprovalForArgs } from '@state/web3/types'
import { setCallResult } from '@state/web3/reducer'
import { callSafePurchase, callSetApprovalFor } from '@w3/calls/nft'
import i18n from '@src/i18n'
import { MoviesResultState, setMovieResult } from '@state/movies/reducer'

export { setCallResult } from '@state/web3/reducer'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

export const setApprovalFor = <P extends Web3SetApprovalForArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const callResult: Web3CallResult = await callSetApprovalFor(params)
      const i18SuccessState: string = i18n.t('MOVIE_ACCEPT_OFFER_SUCCESS')
      const resultState: MoviesResultState = { result: { success: true, message: i18SuccessState } }

      dispatch(setCallResult(callResult))
      dispatch(setMovieResult(resultState))
    } catch (e) {
      const i18FailState: string = i18n.t('MOVIE_ACCEPT_OFFER_ERROR')
      const failResultState: MoviesResultState = { result: { success: false, message: i18FailState } }

      // If any issue we check if response is received if not just send empty object
      dispatch(setCallResult({ status: 0 } as Web3CallResult))
      dispatch(setMovieResult(failResultState))
    }
  }
}

export const safePurchase = <P extends Web3SafePurchaseArgs>(params: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const callResult: Web3CallResult = await callSafePurchase(params)
      const i18SuccessState: string = i18n.t('MOVIE_PAY_OFFER_SUCCESS')
      const resultState: MoviesResultState = { result: { success: true, message: i18SuccessState } }

      dispatch(setCallResult(callResult))
      dispatch(setMovieResult(resultState))
    } catch (e) {
      const i18FailState: string = i18n.t('MOVIE_PAY_OFFER_ERROR')
      const failResultState: MoviesResultState = { result: { success: false, message: i18FailState } }

      // If any issue we check if response is received if not just send empty object
      dispatch(setCallResult({ status: 0 } as Web3CallResult))
      dispatch(setMovieResult(failResultState))
    }
  }
}
