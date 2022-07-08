// REACT IMPORTS
import React, { FC } from 'react';

// MUI IMPORTS
import { Container, styled, Box, BoxProps } from '@mui/material';

// PROJECT IMPORTS
import Footer from '@components/Footer';
import coverBackgroundDefault from '@assets/img/cover_background_default.jpg';
import ProfileMainInfo, { ProfileMainInfoProps } from '@components/ProfileMainInfo';
import ProfileSocials, { ProfileSocialsProps } from '@pages/Profile/components/ProfileSocials';
import ProfileTabs from '@pages/Profile/components/ProfileTabs';
import { FAKE_MOVIES, FAKE_MOVIES_2 } from '@src/config';

// ===========================|| PROFILE - VIEW ||=========================== //

type ChildProps = ProfileSocialsProps & ProfileMainInfoProps;

export interface ProfileViewProps extends ChildProps {
  cover?: string
}

export const ProfileView: FC<ProfileViewProps> = (props): JSX.Element => {

  return (
    <>
      <Container sx={{ maxWidth: '1000px !important', minHeight: 'calc(100vh - 4rem)' }}>
        <ProfileWrapper>
          <Box display={'flex'} position={'relative'} flexDirection={'column'}>
            <Box display={'flex'} position={'relative'} flexDirection={'column'}>
              <ProfileCover component={'img'} src={ !props.cover ? coverBackgroundDefault : props.cover } />
              <ProfileSocials {...props} />
            </Box>
            <ProfileMainInfo
              {...props} sx={{ transform: 'translateY(-3rem)', mt: '-4rem', pointerEvents: 'none' }}
              imageWrapperSx={{ width: '9rem', height: '9rem' }} titleTextVariant={'h3'}
            />
          </Box>
          <ProfileTabs collected={FAKE_MOVIES_2} created={FAKE_MOVIES} />
        </ProfileWrapper>
      </Container>
      <Footer />
    </>
  );
};

export const ProfileWrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
}));

export const ProfileCover = styled(Box)<BoxProps & { src: string }>(() => ({
  width: '100%',
  height: '21rem',
  borderBottomLeftRadius: '1rem',
  borderBottomRightRadius: '1rem',
}));
