// REACT IMPORTS
import React, { FC } from 'react';

// MUI IMPORTS
import { styled, BoxProps, Box, Grid, Typography, Theme } from '@mui/material';

// THIRD PARTY
import { PixelArtIdenticon } from '@components/Identicon';

// PROJECT IMPORTS
import { String } from '@src/utils';
import { SxProps } from '@mui/system';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| PROFILE - MAIN - INFO ||=========================== //

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'inherit';
export interface ProfileMainInfoProps {
  hash?: string | null
  userName?: string
  poster?: string
  sx?: SxProps<Theme>
  imageWrapperSx?: SxProps<Theme>
  titleTextVariant?: TextVariant
  subTitleTextVariant?: TextVariant
}

const ProfileMainInfo: FC<ProfileMainInfoProps> = (props): JSX.Element => {
  const {
    hash,
    userName,
    poster,
    sx,
    imageWrapperSx,
    titleTextVariant,
    subTitleTextVariant,
  } = props;

  return (
    <ProfileMainInfoWrapper sx={sx}>
      <ProfileMainInfoImageWrapper sx={imageWrapperSx}>
        {
          poster ? (
            <ProfileMainInfoImage component={'img'} src={poster} />
          ) : (
            <PixelArtIdenticon seed={hash ?? 'hashCode'} backgroundColor='#fff' size={50} />
          )
        }
      </ProfileMainInfoImageWrapper>
      {
        userName ? (
          <Grid container>
            <Grid item xs={12}>
              <Typography variant={titleTextVariant ?? 'h4'} fontWeight={500} color={'primary'} textAlign={'center'}>
                { userName }
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={subTitleTextVariant ?? 'subtitle2'} fontWeight={400} color={'primary'} textAlign={'center'} sx={{ opacity: 0.6 }}>
                { hash ? String.minifyHash(hash) : '' }
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant={'h4'} fontWeight={500} color={'primary'} textAlign={'center'}>
                { hash ? String.minifyHash(hash) : '' }
              </Typography>
            </Grid>
          </Grid>
        )
      }
    </ProfileMainInfoWrapper>
  );
};

export default ProfileMainInfo;

export const ProfileMainInfoWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  transform: 'translateY(-3rem)',
}));

export const ProfileMainInfoImageWrapper = styled(Box)<BoxProps>(() => ({
  width: '5rem',
  height: '5rem',
  borderRadius: '0.5rem',
  backgroundColor: '#fff',
  boxShadow: '0 3px 6px 6px rgba(0,0,0,0.06)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1rem',
  padding: '2px',
}));

export const ProfileMainInfoImage = styled(Box)<BoxProps & { src: string }>(() => ({
  width: '100%',
  height: 'auto',
  borderRadius: '0.5rem',
}));
