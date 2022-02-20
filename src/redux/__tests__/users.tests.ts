import reducer, { setCreators, initialState } from '@state/users/reducer'
import { ThunkDispatcher, ThunkAction } from '@state/types'
import { User } from '@state/users/types/user'
import { fetchCreators } from '@state/users/actions'
import { FAKE_CREATORS } from '@src/config'
import { request } from '@state/service'

jest.mock('@state/service')

describe('Users store', () => {
  let users: User[]
  let dispatch: ThunkDispatcher
  let getState: () => unknown
  let actionForFetchCreators: ThunkAction<void>

  beforeAll(() => {
    // @typescript-eslint/consistent-type-assertions
    users = FAKE_CREATORS as unknown as User[]
  })

  it('should return tracking initial state', () => {
    expect(
      reducer(undefined, {} as any)
    ).toEqual(initialState)
  })

  it('should handle set for users collection', () => {
    const current = reducer(initialState, setCreators(users))

    expect(current).toEqual({ ...initialState, ...{ creators: users } })
    expect(reducer(current, setCreators(users))).toEqual({
      ...initialState,
      creators: users
    })
  })

  describe('thunk', () => {
    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn()
      getState = jest.fn()
      actionForFetchCreators = fetchCreators()
    })

    it('should call recent action with valid args ', async () => {
      await actionForFetchCreators(dispatch, getState, undefined)
      expect(request).toHaveBeenCalledWith('/creator/recent', {params: undefined})
    })
  })
})
