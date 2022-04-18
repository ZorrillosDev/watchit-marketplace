import { ThunkAction, ThunkDispatcher } from '@state/types';
import { User, UsersArgs } from '@state/users/types';
import { setCreators } from '@state/users/reducer';
import { request } from '@state/service';
import { Endpoints } from './service';

export const fetchCreators = <P extends UsersArgs>(params?: P): ThunkAction<Promise<void>> => {
  return async (dispatch: ThunkDispatcher) => {
    try {
      const usersCollection: User[] = await request(Endpoints.recent, { params });
      dispatch(setCreators(usersCollection));
    } catch (e) {
      // TODO handle error here
    }
  };
};
