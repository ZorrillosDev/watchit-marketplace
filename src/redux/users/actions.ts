import {ThunkAction, ThunkDispatcher} from '@state/types'
import {User, UsersArgs} from '@state/users/types'
import {setCreators} from '@state/users/reducer'
import fetch, {Endpoints} from './service'

export const fetchCreators = <P extends UsersArgs>(): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const usersCollection: User[] = await fetch(Endpoints.recent)
      dispatch(setCreators(usersCollection))
    } catch (e) {
      // TODO handle error here
    }
  }
}
