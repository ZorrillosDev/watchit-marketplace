// REACT IMPORTS
import React, { FC, useState } from 'react';

// THIRD PARTY IMPORTS
import * as yup from 'yup';

// MUI IMPORTS
import { Box, Button, Grid, Typography, Zoom } from '@mui/material';

// PROJECT IMPORTS
import { Formik } from 'formik';
import { Translation } from '@src/i18n';
import ImagePicker from '@components/ImagePicker';
import { InputTextField } from '@components/Inputs/InputTextField';
import { useEthers } from '@usedapp/core';
import { LightTooltip } from '@components/Tooltip';
import MovieCreateModalProgress from '@pages/Create/components/MovieCreateModalProgress';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| MOVIE - CREATE - FORM ||=========================== //

export interface ProfileEditFormProps {
  poster: string
  setPoster: (p: string) => void
  cover: string
  setCover: (p: string) => void
  userName: string
  setUserName: (p: string) => void
  onSubmit: (e: any) => void
  progress?: number
}

const ProfileEditForm: FC<ProfileEditFormProps> = (props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => { setOpen(true); };
  const handleClose = (): void => { setOpen(false); };
  const { account } = useEthers();
  const validationSchema = yup.object({
    cover: yup.mixed()
      .required()
      .test('fileType', 'Supported Image Format', (value) =>
        value?.name && ['jpeg', 'png', 'jpg', 'gif'].includes(value.name.split('.').pop()),
      ),
    poster: yup.mixed()
      .required()
      .test('fileType', 'Supported Image Format', (value) =>
        value?.name && ['jpeg', 'png', 'jpg', 'gif'].includes(value.name.split('.').pop()),
      ),
    userName: yup.string().required().min(4).trim(),
    biography: yup.string().required().min(4).trim(),
    email: yup.string().required().min(4).trim(),
    youtube: yup.string().required().min(4).trim(),
    twitter: yup.string().required().min(4).trim(),
    instagram: yup.string().required().min(4).trim(),
    facebook: yup.string().required().min(4).trim(),
    site: yup.string().required().min(4).trim(),
  });

  const initialValues = {
    cover: undefined,
    poster: undefined,
    userName: '',
    biography: '',
    email: '',
    youtube: '',
    twitter: '',
    instagram: '',
    facebook: '',
    site: '',
  };

  return (
    <Formik
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
    >
      {formik => (
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          method='post'
          encType='multipart/form-data'
          sx={{ mb: { xs: 0, sm: 8 } }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ImagePicker
                error={Boolean(formik.errors.cover)} id='movie_cover'
                title={<Translation target='PROFILE_EDIT_COVER' />}
                preview={props.cover} accept='image/jpeg, image/png, image/jpg, image/gif'
                name='cover'
                helpText={<Translation target='MOVIE_CREATE_POSTER_HELP_TEXT' />}
                handleChange={(e) => {
                  formik.handleChange(e);
                  const file = e.target.files[0];
                  props.setCover(URL.createObjectURL(file));
                  formik.setFieldValue('cover', file);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <ImagePicker
                error={Boolean(formik.errors.poster)} id='movie_poster'
                title={<Translation target='PROFILE_EDIT_IMAGE' />}
                preview={props.poster} accept='image/jpeg, image/png, image/jpg, image/gif'
                name='poster'
                helpText={<Translation target='MOVIE_CREATE_POSTER_HELP_TEXT' />}
                handleChange={(e) => {
                  formik.handleChange(e);
                  const file = e.target.files[0];
                  props.setPoster(URL.createObjectURL(file));
                  formik.setFieldValue('poster', file);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                id='movie_userName' label={<Translation target='PROFILE_EDIT_USERNAME' />}
                variant='standard' name='userName'
                helperText={<Translation target='PROFILE_EDIT_USERNAME_HELP' />}
                error={Boolean(formik.errors.userName)}
                onChange={(e) => {
                  props.setUserName(e.target.value);
                  formik.setFieldValue('userName', e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                id='movie_biography' label={<Translation target='PROFILE_EDIT_BIOGRAPHY' />}
                helperText={<Translation target='PROFILE_EDIT_BIOGRAPHY_HELP' />}
                variant='standard' error={Boolean(formik.errors.biography)}
                onChange={formik.handleChange} name='biography'
              />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                id='movie_email' label={<Translation target='PROFILE_EDIT_EMAIL' />}
                helperText={<Translation target='PROFILE_EDIT_EMAIL_HELP' />}
                variant='standard' error={Boolean(formik.errors.email)}
                onChange={formik.handleChange} name='email'
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant={'h4'} fontWeight={500} color={'primary'}>
                    <Translation target='PROFILE_EDIT_SOCIAL_MEDIA_TITLE' />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant={'body1'} fontWeight={400} color={'primary'}>
                    <Translation target='PROFILE_EDIT_SOCIAL_MEDIA_SUBTITLE' />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <InputTextField
                id='movie_youtube' label={<Translation target='PROFILE_EDIT_SOCIAL_YOUTUBE' />}
                helperText={<Translation target='PROFILE_EDIT_SOCIAL_YOUTUBE_HELP' />}
                variant='standard' error={Boolean(formik.errors.youtube)}
                onChange={formik.handleChange} name='youtube'
              />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                id='movie_twitter' label={<Translation target='PROFILE_EDIT_SOCIAL_TWITTER' />}
                helperText={<Translation target='PROFILE_EDIT_SOCIAL_TWITTER_HELP' />}
                variant='standard' error={Boolean(formik.errors.twitter)}
                onChange={formik.handleChange} name='twitter'
              />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                id='movie_instagram' label={<Translation target='PROFILE_EDIT_SOCIAL_INSTAGRAM' />}
                helperText={<Translation target='PROFILE_EDIT_SOCIAL_INSTAGRAM_HELP' />}
                variant='standard' error={Boolean(formik.errors.instagram)}
                onChange={formik.handleChange} name='instagram'
              />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                id='movie_facebook' label={<Translation target='PROFILE_EDIT_SOCIAL_FACEBOOK' />}
                helperText={<Translation target='PROFILE_EDIT_SOCIAL_FACEBOOK_HELP' />}
                variant='standard' error={Boolean(formik.errors.facebook)}
                onChange={formik.handleChange} name='facebook'
              />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                id='movie_site' label={<Translation target='PROFILE_EDIT_SOCIAL_PERSONAL_SITE' />}
                helperText={<Translation target='PROFILE_EDIT_SOCIAL_PERSONAL_SITE_HELP' />}
                variant='standard' error={Boolean(formik.errors.site)}
                onChange={formik.handleChange} name='site'
              />
            </Grid>
            <Grid item xs={6}>
              <LightTooltip
                TransitionComponent={Zoom} title={(account === null)
                  ? <Translation target='PROFILE_EDIT_BUTTON_ADD_TOOLTIP' />
                  : ''}
              >
                <Box>
                  <Button
                    type='submit' variant='contained' color='primary' fullWidth
                    onClick={handleOpen} disableElevation size='large' sx={{ mt: 3 }}
                    disabled={formik.isSubmitting || account === null}
                  >
                    <Translation target='PROFILE_EDIT_BUTTON_ADD' />
                  </Button>
                </Box>
              </LightTooltip>
            </Grid>
            <MovieCreateModalProgress
              open={open}
              progress={props.progress ?? 0}
              handleClose={handleClose}
            />
          </Grid>
        </Box>
      )}
    </Formik>
  );
};

export default ProfileEditForm;
