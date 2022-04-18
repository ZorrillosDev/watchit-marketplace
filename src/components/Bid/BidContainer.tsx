// REACT IMPORTS
import React, { FC, useCallback, useState } from 'react';

// PROJECT IMPORTS
import BidView from '@components/Bid/BidView';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';
import { BidArgs, BidActions } from '@state/bids/types';
import { commitBidMovie } from '@state/bids/actions';
import { connect } from 'react-redux';
import { useEthers } from '@usedapp/core';
import { useParams } from 'react-router';

// ===========================|| BID - CONTAINER ||=========================== //

type BidContainerProps = { buttonSx?: SxProps<Theme> } & BidActions;

const BidContainer: FC<BidContainerProps> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<BidArgs>();
  const { account } = useEthers();

  const {
    buttonSx,
    commitBidMovie,
  } = props;

  const handleSetBid = useCallback((bid: number): void => {
    if (account === undefined) {
      return;
    }

    setIsLoading(true);
    commitBidMovie({
      account: account ?? '',
      id,
      bid,
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [account]);

  return <BidView {...{ buttonSx, isLoading, handleSetBid }} />;
};

const mapDispatchToProps: Partial<BidActions> = { commitBidMovie };
export const Bid = connect(
  null,
  mapDispatchToProps,
)(BidContainer);
