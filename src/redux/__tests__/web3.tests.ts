import { ThunkDispatcher, ThunkAction } from '@state/types'
// import { Movie } from '@state/movies/types/movies'
// import { FAKE_MOVIES } from '@src/config'
// import { request } from '@state/service'
import { Web3SetApprovalForArgs } from '@state/web3/types'
import { setApprovalFor } from '@state/web3/actions'
import { callSafePurchase, callSetApprovalFor } from '@w3/calls/nft'
// import reducer, { addMovie, initialState, setMovies, setMovie } from '@state/movies/reducer'

jest.mock('@w3/calls/nft')

describe('Web3 store', () => {
  let actionForSetCallResult: ThunkAction<void>
  let setApprovalArgs: Web3SetApprovalForArgs
  let dispatch: ThunkDispatcher
  let getState: () => unknown

  beforeEach(() => {
    // initialize new spies
    dispatch = jest.fn()
    getState = jest.fn()
    setApprovalArgs = { tokenId: '0x000', approved: '100', operator: '0x0' }
    actionForSetCallResult = setApprovalFor(setApprovalArgs)
  })

  it('should call approvalFor with valid args ', async () => {
    await actionForSetCallResult(dispatch, getState, undefined)
    expect(callSetApprovalFor).toHaveBeenCalledWith(setApprovalArgs)
  })
})
