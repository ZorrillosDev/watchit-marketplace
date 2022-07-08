// REACT IMPORTS
import React, { FC } from 'react';

// MUI IMPORTS
import { styled, BoxProps, Box, Link, Theme } from '@mui/material';
import { SxProps } from '@mui/system';

// THIRD PARTY IMPORTS
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconUser } from '@tabler/icons';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| MOVIE - CREATE - POSTER ||=========================== //

export interface ProfileSocialsProps {
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  site?: string
  sx?: SxProps<Theme>
}

const ProfileSocials: FC<ProfileSocialsProps> = (props): JSX.Element => {
  const {
    facebook,
    instagram,
    twitter,
    youtube,
    site,
  } = props;

  return (
    <ProfileSocialsWrapper sx={props.sx}>
      {
        facebook ? (
          <Link href={facebook} target='_blank'>
            <ProfileSocialsItem>
              <IconBrandFacebook />
            </ProfileSocialsItem>
          </Link>
        ) : <></>
      }
      {
        instagram ? (
          <Link href={instagram} target='_blank'>
            <ProfileSocialsItem>
              <IconBrandInstagram />
            </ProfileSocialsItem>
          </Link>
        ) : <></>
      }
      {
        twitter ? (
          <Link href={twitter} target='_blank'>
            <ProfileSocialsItem>
              <IconBrandTwitter />
            </ProfileSocialsItem>
          </Link>
        ) : <></>
      }
      {
        youtube ? (
          <Link href={youtube} target='_blank'>
            <ProfileSocialsItem>
              <IconBrandYoutube />
            </ProfileSocialsItem>
          </Link>
        ) : <></>
      }
      {
        site ? (
          <Link href={site} target='_blank'>
            <ProfileSocialsItem>
              <IconUser />
            </ProfileSocialsItem>
          </Link>
        ) : <></>
      }
    </ProfileSocialsWrapper>
  );
};

export default ProfileSocials;

export const ProfileSocialsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: '0.5rem',
  '& > a:first-of-type > div': {
    marginLeft: '0',
  },
}));

export const ProfileSocialsItem = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  borderRadius: '0.5rem',
  border: '1px solid #eee',
  position: 'relative',
  marginLeft: '0.5rem',
  color: theme.palette.text.secondary,
  ':hover': {
    color: theme.palette.text.primary,
  },
  svg: {
    width: '1.2rem',
    height: 'auto',
  },
}));
