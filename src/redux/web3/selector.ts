import {RootStateOrAny} from 'react-redux'
import {Web3CallResult} from "@state/web3/types";

export const selectWeb3Result = (state: RootStateOrAny): Web3CallResult => state.web3.result

