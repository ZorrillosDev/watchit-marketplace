// REACT IMPORTS
import React, { FC } from 'react'

// THIRD PARTY IMPORTS
import { useFormik } from 'formik'
import * as yup from 'yup'

// MUI IMPORTS
import {
  Box, BoxProps, Button, Grid, styled,
  Typography, TypographyProps
} from '@mui/material'

// PROJECT IMPORTS
import { InputProperties, InputSwitch, InputFile }  from '@components/Inputs'
import { Translation } from '@src/i18n'
import { File } from '@src/utils'
import { InputTextField } from "@components/Inputs/InputTextField";

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| MOVIE - CREATE - FORM ||=========================== //

const validationSchema = yup.object({
  Film: yup.mixed()
    .required()
    .test('fileType', 'Supported Video Formats', (value) =>
      value && ['webm', 'mp4'].includes(value.split('.').pop())
    ),
  Poster: yup.mixed()
    .required()
    .test('fileType', 'Supported Image Format', (value) =>
      value && ['jpeg', 'png', 'jpg', 'gif'].includes(value.split('.').pop())
    ),
  Name: yup.string().required().min(2).trim(),
  Description: yup.string().required().min(4).trim(),
  Bid: yup.number().positive().min(1).required(),
  Trailer: yup.string().min(4).trim(),
  NftDescription: yup.string().min(4).trim()
})

export interface ModalBalanceFormProps {
  poster: string
  setPoster: (p: string) => void
  film: string
  setFilm: (p: string) => void
  setName: (p: string) => void
  setBid: (p: number) => void
}

const MovieCreateForm: FC<ModalBalanceFormProps> = (props): JSX.Element => {
  const formik = useFormik({
    initialValues: {
      Film: undefined,
      Poster: undefined,
      Name: '',
      Description: '',
      Bid: 0,
      Trailer: '',
      NftDescription: ''
    } as any,
    validationSchema: validationSchema,
    onSubmit: () => {}
  })

  const handlePosterChange = (e: any): void => {
    formik.handleChange(e)
    props.setPoster(URL.createObjectURL(e.target.files[0]))
  }

  const handleFilmChange = async (e: any): Promise<any> => {
    formik.handleChange(e)
    const cover = await File.getVideoCover(e.target.files[0], 0.1)
    props.setFilm(URL.createObjectURL(cover))
  }

  const handleNameChange = (e: any): void => {
    formik.handleChange(e)
    props.setName(e.target.value)
  }

  const handleBidChange = (e: any): void => {
    formik.handleChange(e)
    props.setBid(e.target.value)
  }

  return (
    <Box component='form' onSubmit={formik.handleSubmit} method='post' sx={{ mb: { xs: 0, sm: 8 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InputFile
            error={Boolean(formik.errors.Film)} id='movie_film' title={<Translation target='MOVIE_CREATE_FILM_TITLE' />}
            image={props.film} accept='video/webm, video/mp4' isImageFullWidth name='Film'
            helpText={<Translation target='MOVIE_CREATE_FILM_HELP_TEXT' />} handleChange={handleFilmChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputFile
            error={Boolean(formik.errors.Poster)} id='movie_poster' title={<Translation target='MOVIE_CREATE_POSTER_TITLE' />}
            image={props.poster} accept='image/jpeg, image/png, image/jpg, image/gif' name='Poster'
            helpText={<Translation target='MOVIE_CREATE_POSTER_HELP_TEXT' />} handleChange={handlePosterChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputTextField
            id='movie_name' label={<Translation target='MOVIE_CREATE_NAME' />} variant='standard' name='Name'
            helperText={<Translation target='MOVIE_CREATE_NAME_HELP_TEXT' />}
            error={Boolean(formik.errors.Name)} onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12}>
          <InputTextField
            id='movie_description' label={<Translation target='MOVIE_CREATE_DESCRIPTION' />} variant='standard' name='Description'
            helperText={<Translation target='MOVIE_CREATE_DESCRIPTION_HELP_TEXT' />}
            error={Boolean(formik.errors.Description)} onChange={formik.handleChange}
            multiline rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <MovieCreateBidWrapper>
            <InputTextField
              type='number' name='Bid' helperText={<Translation target='MOVIE_CREATE_BID_HELP_TEXT' />}
              id='movie_minimum_bid' label={<Translation target='MOVIE_CREATE_BID' />} variant='standard'
              error={Boolean(formik.errors.Bid)} onChange={handleBidChange}
            />
            <MovieCreateBidText variant='body2'>ETH</MovieCreateBidText>
          </MovieCreateBidWrapper>
        </Grid>
        <Grid item xs={12}>
          <InputTextField
            id='movie_trailer' label={<Translation target='MOVIE_CREATE_TRAILER' />} variant='standard'
            error={Boolean(formik.errors.Trailer)} onChange={formik.handleChange} name='Trailer'
          />
        </Grid>
        <Grid item xs={12}>
          <InputTextField
            id='movie_alternative_description' label={<Translation target='MOVIE_CREATE_NFT_DESC' />}
            helperText={<Translation target='MOVIE_CREATE_NFT_DESC_HELP_TEXT' />} variant='standard'
            error={Boolean(formik.errors.NftDescription)} onChange={formik.handleChange}
            multiline rows={2} name='NftDescription'
          />
        </Grid>
        <InputProperties />
        <Grid item xs={12}>
          <InputSwitch
            title={<Translation target='MOVIE_CREATE_UNLOCK' />} subtitle={<Translation target='MOVIE_CREATE_UNLOCK_HELP_TEXT' />}
            content={(
              <InputTextField
                id='unlocked_digital_key' label={<Translation target='MOVIE_CREATE_UNLOCK_KEY' />} variant='standard' name='unlockKey'
                helperText={<Translation target='MOVIE_CREATE_UNLOCK_KEY_HELP_TEXT' />}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <InputSwitch
            title={<Translation target='MOVIE_CREATE_FREE_MINTING' />} defaultChecked
            subtitle={<Translation target='MOVIE_CREATE_FREE_MINTING_HELP_TEXT' />}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            type='submit' variant='contained' color='primary' fullWidth
            disableElevation size='large' sx={{ mt: 3 }}
          >
            <Translation target='MOVIE_CREATE_ADD_BUTTON' />
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

const MovieCreateBidWrapper = styled(Box)<BoxProps>(() => ({
  width: '100%',
  position: 'relative',
  input: {
    paddingRight: '3rem'
  }
}))

const MovieCreateBidText = styled(Typography)<TypographyProps>(({ theme }) => ({
  position: 'absolute',
  right: 0,
  color: theme.palette.text.primary,
  fontWeight: 600,
  bottom: '26px'
}))

export default MovieCreateForm
