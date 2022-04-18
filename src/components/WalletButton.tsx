import React, { FC, memo } from 'react';
import i18n from '@src/i18n';
import { Button } from '@mui/material';
import { PixelArtIdenticon } from '@components/Identicon';
import { useEtherBalance } from '@usedapp/core';
import { useActivateNetwork } from '@hooks/useActivateNetwork';
import { AccountBalanceWallet } from '@components/Icons';
import { Ethers } from '@src/utils';

/* eslint-disable  react/display-name */
export const WalletButton: FC = memo((): JSX.Element => {
  const { activateBrowserWallet, deactivate, account } = useActivateNetwork();
  const etherBalance = useEtherBalance(account);

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
      onClick={
                () => account === undefined
                  ? activateBrowserWallet()
                  : deactivate()
            }
    >
      {
                account !== undefined
                  ? `${(etherBalance != null) ? Ethers.getWeiToETH(etherBalance) : 0} ETH`
                  : i18n.t('GLOBAL_WALLET')
            }
    </Button>
  );
});

export default WalletButton;
