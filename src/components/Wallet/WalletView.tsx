// REACT IMPORTS
import React, { FC, useRef } from 'react';

// MUI IMPORTS
import { ClickAwayListener, Grid, styled, GridProps } from '@mui/material';

// PROJECT IMPORTS
import WalletMenu, { WalletMenuProps } from '@components/Wallet/WalletMenu';
import { WalletButton, WalletButtonProps } from '@components/Wallet/WalletButton';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| SEARCH - VIEW ||=========================== //

export interface SearchViewProps extends Omit<WalletMenuProps, 'anchorRef'> {
  handleOpen: () => void
}

const WalletView: FC<SearchViewProps & Omit<WalletButtonProps, 'onClick'>> = (props): JSX.Element => {
  const anchorRef = useRef(null);
  const handleMenuOpen = () => {
    if (props.account !== undefined) props.handleOpen();
  };

  return (
    <ClickAwayListener onClickAway={props.handleClose}>
      <WalletViewWrapper ref={anchorRef}>
        <WalletButton {...props} onClick={handleMenuOpen} />
        <WalletMenu {...props} anchorRef={anchorRef.current} />
      </WalletViewWrapper>
    </ClickAwayListener>
  );
};

const WalletViewWrapper = styled(Grid)<GridProps>(() => ({
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1000,
}));

export default WalletView;
