import { ThunkDispatcher, ThunkAction } from '@state/types';
import { Web3SetApprovalForArgs, Web3SafePurchaseArgs } from '@state/web3/types';
import { setApprovalFor, safePurchase } from '@state/web3/actions';
import { callSafePurchase, callSetApprovalFor } from '@w3/calls/nft';

jest.mock('@w3/calls/nft');

describe('Web3 store', () => {
  let actionForSetCallResult: ThunkAction<void>;
  let actionForSafePurchase: ThunkAction<void>;
  let setApprovalArgs: Web3SetApprovalForArgs;
  let safePurchaseArgs: Web3SafePurchaseArgs;
  let dispatch: ThunkDispatcher;
  let getState: () => unknown;

  beforeEach(() => {
    // initialize new spies
    dispatch = jest.fn();
    getState = jest.fn();
    safePurchaseArgs = { tokenId: '0x000' };
    setApprovalArgs = { tokenId: '0x000', approved: '100', operator: '0x0' };
    actionForSetCallResult = setApprovalFor(setApprovalArgs);
    actionForSafePurchase = safePurchase(safePurchaseArgs);
  });

  it('should call approvalFor with valid args ', async () => {
    await actionForSetCallResult(dispatch, getState, undefined);
    expect(callSetApprovalFor).toHaveBeenCalledWith(setApprovalArgs);
  });

  it('should call safePurchase with valid args ', async () => {
    await actionForSafePurchase(dispatch, getState, undefined);
    expect(callSafePurchase).toHaveBeenCalledWith(safePurchaseArgs);
  });
});
