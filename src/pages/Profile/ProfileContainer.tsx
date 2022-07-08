// REACT IMPORTS
import React, { FC } from 'react';

// PROJECT IMPORTS

import { ProfileView } from '@pages/Profile/ProfileView';
import { useEthers } from '@usedapp/core';

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| PROFILE - CONTAINER ||=========================== //

export const ProfileContainer: FC = (): JSX.Element => {
  const { account } = useEthers();

  const testProps = {
    userName: 'Jacob Peralta',
    poster: 'https://avatars.githubusercontent.com/u/14361925?v=4',
    facebook: 'https://www.facebook.com/',
    twitter: 'https://www.twitter.com/',
    instagram: 'https://www.instagram.com/',
    youtube: 'https://www.youtube.com/',
    site: 'https://www.watchit.movie/',
  };

  return <ProfileView {...{ hash: account, ...testProps }} />;
};
