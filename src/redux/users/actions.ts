import { ThunkAction, ThunkDispatcher } from '@state/types'
import { User, UsersArgs } from '@state/users/types'
import { setCreators } from '@state/users/reducer'
import getCreators from './service'

export const fetchCreators = <P extends UsersArgs>(args?: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const usersCollection: User[] = await getCreators()
      dispatch(setCreators(usersCollection))
    } catch (e) {
      // TODO handle error here
    }
  }
}
