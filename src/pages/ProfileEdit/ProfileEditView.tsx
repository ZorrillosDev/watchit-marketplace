// REACT IMPORTS
import React, { FC, useState } from 'react';

// MUI IMPORTS
import { Container, Grid, styled, Typography, GridProps, useMediaQuery } from '@mui/material';

// PROJECT IMPORTS
import ProfileEditForm from '@pages/ProfileEdit/components/ProfileEditForm';
import ProfileEditPreview from '@pages/ProfileEdit/components/ProfileEditPreview';
import { useTheme } from '@mui/material/styles';
import Footer from '@components/Footer';
import { Translation } from '@src/i18n';

// ===========================|| PROFILE - EDIT - VIEW ||=========================== //

export interface ProfileEditViewProps {
  onSubmit: (e: any) => void
  progress?: number
  hash?: string | null
}

export const ProfileEditView: FC<ProfileEditViewProps> = (props): JSX.Element => {
  const theme = useTheme();
  const [userName, setUserName] = useState('');
  const [cover, setCover] = useState('');
  const [poster, setPoster] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Allow set a "bridge" between sibling components
  const createFormProps = {
    cover,
    setCover,
    poster,
    setPoster,
    userName,
    setUserName,
    ...props,
  };

  return (
    <>
      <Container sx={{ maxWidth: '1000px !important', mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h3' color='primary'>
              <Translation target='PROFILE_EDIT_TITLE' />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={isMobile ? 2 : 6}>
              <Grid item xs={12} sm={7}>
                <ProfileEditForm {...createFormProps} />
              </Grid>
              <Grid item xs={12} sm={5}>
                <ProfileEditStickyElement container spacing={3}>
                  <Grid item xs={12}>
                    <Typography
                      variant='h5' color='text.primary' fontWeight={600}
                      sx={{ mt: 2, mb: -2 }}
                    >
                      <Translation target='MOVIE_CREATE_PREVIEW' />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <ProfileEditPreview
                      userName={userName}
                      poster={poster}
                      cover={cover}
                      hash={props.hash ?? ''}
                    />
                  </Grid>
                </ProfileEditStickyElement>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

const ProfileEditStickyElement = styled(Grid)<GridProps>(() => ({
  width: '100%',
  position: 'sticky',
  top: '50px',
}));
