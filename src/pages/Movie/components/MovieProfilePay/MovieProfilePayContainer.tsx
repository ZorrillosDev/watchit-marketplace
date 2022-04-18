// REACT IMPORTS
import React, { FC, useCallback, useState } from 'react';

// PROJECT IMPORTS
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';
import { useEthers } from '@usedapp/core';
import MovieProfilePayView from '@pages/Movie/components/MovieProfilePay/MovieProfilePayView';
import { Web3State } from '@state/web3/types';
import { connect, RootStateOrAny } from 'react-redux';
import { selectWeb3Result } from '@state/web3/selector';
import { Movie, MoviesActions, MovieArgs } from '@state/movies/types';
import { safePurchaseMovie } from '@src/redux/movies/actions';
import { useParams } from 'react-router';
import { Bid } from '@src/redux/bids/types';

// ===========================|| MOVIE PROFILE PAY - CONTAINER ||=========================== //

export type MovieProfilePayContainerProps = {
  buttonSx?: SxProps<Theme>
} & Movie & MoviesActions & Bid & Web3State;

const MovieProfilePayContainer: FC<MovieProfilePayContainerProps> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const { account } = useEthers();
  const { id } = useParams<MovieArgs>();
  const { safePurchaseMovie } = props;

  const handlePay = useCallback((): void => {
    if (account === undefined) {
      return;
    }

    setIsLoading(true);
    safePurchaseMovie({
      id,
      tokenId: props.token,
      value: props.price.toString(),
    });
  }, [account, id]);

  return <MovieProfilePayView {...{ isLoading, handlePay, ...props }} />;
};

const mapDispatchToProps: Partial<MoviesActions> = { safePurchaseMovie };
const mapStateToProps = (state: RootStateOrAny): Partial<Web3State> => {
  const result = selectWeb3Result(state);
  return { result };
};

export const MovieProfilePay = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieProfilePayContainer);
