import { RootStateOrAny } from 'react-redux';
import { Bid } from './types';

export const selectBidCollection = (state: RootStateOrAny): Bid[] => state.bids.bids;
