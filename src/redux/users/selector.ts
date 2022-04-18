import { RootStateOrAny } from 'react-redux';
import { User } from '@state/users/types';

export const selectCreations = (state: RootStateOrAny): User[] => (state.users.creators);
