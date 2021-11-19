import reducer, { setUsers, initialState } from '@state/users/reducer'
import { ThunkDispatcher, ThunkAction } from '@state/types'
import { User } from '@state/types/user'
import { fetchCreators } from '@state/users/actions'
import { FAKE_CREATORS } from '@src/config'

// @ts-expect-error
window.fetch = jest.fn(async () =>
  await Promise.resolve({
    json: async () => await Promise.resolve(FAKE_CREATORS[0])
  })
)

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
    const current = reducer(initialState, setUsers(users))

    expect(current).toEqual({ ...initialState, ...{ collection: users } })
    expect(reducer(current, setUsers(users))).toEqual({
      ...initialState,
      collection: users
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
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/cache/creators')
    })
  })
})
