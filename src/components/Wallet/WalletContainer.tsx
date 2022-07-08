// TRANSFER MODAL IMPORTS
import React, { FC, useCallback, useState } from 'react';

// PROJECT IMPORTS
import WalletView from '@components/Wallet/WalletView';
import { useActivateNetwork } from '@hooks/useActivateNetwork';
import { useEtherBalance } from '@usedapp/core';

// ===========================|| SEARCH - CONTAINER ||=========================== //

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */
export const WalletContainer: FC = (): JSX.Element => {
  const { activateBrowserWallet, deactivate, account } = useActivateNetwork();
  const etherBalance = useEtherBalance(account);
  const [open, setOpen] = useState(false);
  const handleClose = useCallback((): void => setOpen(false), [open]);
  const handleOpen = useCallback((): void => setOpen(true), [open]);

  return (
    <WalletView {...{
      handleClose, handleOpen, open, activateBrowserWallet,
      deactivate, etherBalance, account, hash: account,
    }} />
  );
};
