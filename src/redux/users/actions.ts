import { ThunkAction, ThunkDispatcher } from '@state/types'
import { User, UsersArgs } from '@state/users/types'
import { setUsersCreations } from '@state/users/reducer'
import getCreators from './service'


export const fetchCreators = <P extends UsersArgs>(args?: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      getCreators().then(async (res) => {
        const usersCollection: User[] = await res.json()
        // Set valid result from API
        dispatch(setUsersCreations(usersCollection))
      })
    } catch (e) {
      // TODO handle error here
    }
  }
}
