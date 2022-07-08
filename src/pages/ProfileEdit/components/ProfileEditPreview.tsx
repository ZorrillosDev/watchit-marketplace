// REACT IMPORTS
import React, { FC } from 'react';

// MUI IMPORTS
import { styled, BoxProps, Box } from '@mui/material';

// THIRD PARTY

// PROJECT IMPORTS
import coverBackgroundDefault from '@assets/img/cover_background_default.jpg';
import ProfileMainInfo, { ProfileMainInfoProps } from '@components/ProfileMainInfo';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| PROFILE - EDIT - PREVIEW ||=========================== //

export interface ProfileEditPreviewProps extends ProfileMainInfoProps {
  cover?: string
}

const ProfileEditPreview: FC<ProfileEditPreviewProps> = (props): JSX.Element => {
  const { cover } = props;

  return (
    <ProfileEditPreviewWrapper>
      <ProfileEditPreviewCover component={'img'} src={ !cover ? coverBackgroundDefault : cover } />
      <ProfileMainInfo {...props} />
    </ProfileEditPreviewWrapper>
  );
};

export default ProfileEditPreview;

export const ProfileEditPreviewWrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
}));

export const ProfileEditPreviewCover = styled(Box)<BoxProps & { src: string }>(() => ({
  width: '100%',
  height: '8rem',
  borderRadius: '1rem',
}));
