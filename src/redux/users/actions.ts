import {ThunkAction, ThunkDispatcher} from '@state/types'
import {UsersArgs} from '@state/users/types'
import {API_ENDPOINT} from '@state/CONSTANTS'
import {User} from "@state/types/user";
import {setUsers} from "@state/users/reducer";

export interface UsersActions {
    fetchUsers: <P extends UsersArgs>(args?: P) => void
}

export const fetchUsers = <P extends UsersArgs>(args?: P): ThunkAction<Promise<void>> => {
    return async (dispatch: ThunkDispatcher) => {
        try {
            fetch(`${API_ENDPOINT}/cache/creators`).then(async (res) => {
                const usersCollection: User[] = await res.json()
                // Set valid result from API
                dispatch(setUsers(usersCollection))
            }).catch((error) => console.log(error))
        } catch (e) {
            // TODO handle error here
        }
    }
}
