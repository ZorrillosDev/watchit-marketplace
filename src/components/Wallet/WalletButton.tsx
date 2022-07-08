import React, { FC, memo } from 'react';
import i18n from '@src/i18n';
import { Button } from '@mui/material';
import { PixelArtIdenticon } from '@components/Identicon';
import { AccountBalanceWallet } from '@components/Icons';
import { Ethers } from '@src/utils';
import { BigNumber } from '@ethersproject/bignumber';

// ===========================|| WALLET - BUTTON ||=========================== //

/* eslint-disable  react/display-name */

export interface WalletButtonProps {
  etherBalance?: BigNumber
  account?: string | null
  activateBrowserWallet: () => void
  onClick: () => void
}

export const WalletButton: FC<WalletButtonProps> = (props): JSX.Element => {
  let { account, activateBrowserWallet, etherBalance } = props;

  const handleClick = () => {
    if (account === undefined) activateBrowserWallet();
    props.onClick();
  };

  const icon: JSX.Element = account !== undefined
    ? <PixelArtIdenticon seed={account ?? ''} />
    : <AccountBalanceWallet fontSize='inherit' />;

  return (
    <Button
      sx={{
        mt: { xs: 1, md: 0 },
        ml: { xs: 0, md: 1 },
        borderRadius: 3,
      }}
      variant='contained'
      color='primary'
      startIcon={icon}
      onClick={handleClick}
    >
      {
        account !== undefined
          ? `${(etherBalance != null) ? Ethers.getWeiToETH(etherBalance) : 0} ETH`
          : i18n.t('GLOBAL_WALLET')
      }
    </Button>
  );
};

export default memo(WalletButton);
