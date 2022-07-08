// REACT IMPORTS
import React, { FC, PropsWithChildren, memo, useMemo } from 'react';

// MUI IMPORTS
import { Box, BoxProps, styled } from '@mui/material';
import { Movie } from '@state/movies/types';
import ProfilePoster from '@pages/Profile/components/ProfilePoster';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| PROFILE - TAB - PANEL ||=========================== //

interface ProfileTabPanelProps {
  posters: Movie[]
}

const ProfilePosters: FC<PropsWithChildren<ProfileTabPanelProps>> = (props): JSX.Element => {
  const getPosters: Movie[] = useMemo(() => {
    return props.posters;
  }, [props.posters]);

  return (
    <ProfilePostersWrapper>
      {
        getPosters.map(el => <ProfilePoster {...el} key={Math.random()} />)
      }
    </ProfilePostersWrapper>
  );
};

export const ProfilePostersWrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  marginTop: '1rem',
  marginBottom: '3rem',
}));

export default memo(ProfilePosters);