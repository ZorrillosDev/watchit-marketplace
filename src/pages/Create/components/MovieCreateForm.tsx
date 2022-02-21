// REACT IMPORTS
import React, { FC } from 'react'

// THIRD PARTY IMPORTS
import * as yup from 'yup'

// MUI IMPORTS
import {
  Box, BoxProps, Button, Grid, styled,
  Typography, TypographyProps, Zoom
} from '@mui/material'

// PROJECT IMPORTS
import { File } from '@src/utils'
import { Formik } from 'formik'
import { Translation } from '@src/i18n'
import { InputSwitch } from '@components/Inputs'
import ImagePicker from '@components/ImagePicker'
import { InputTextField } from '@components/Inputs/InputTextField'
import { useEthers } from '@usedapp/core'
import { LightTooltip } from '@components/Tooltip'
import MovieCreateModalProgress from '@pages/Create/components/MovieCreateModalProgress'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| MOVIE - CREATE - FORM ||=========================== //

export interface ModalBalanceFormProps {
  poster: string
  film: string
  setPoster: (p: string) => void
  setFilm: (p: string) => void
  setTitle: (p: string) => void
  setPrice: (p: number) => void
  onSubmit: (e: any) => void
  progress?: number
}

const MovieCreateForm: FC<ModalBalanceFormProps> = (props): JSX.Element => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = (): void => { setOpen(true) }
  const handleClose = (): void => { setOpen(false) }
  const { account } = useEthers()
  const validationSchema = yup.object({
    film: yup.mixed()
      .required()
      .test('fileType', 'Supported Video Formats', (value: any) =>
        value?.name && ['webm', 'mp4'].includes(value.name.split('.').pop())
      ),
    poster: yup.mixed()
      .required()
      .test('fileType', 'Supported Image Format', (value) =>
        value?.name && ['jpeg', 'png', 'jpg', 'gif'].includes(value.name.split('.').pop())
      ),
    title: yup.string().required().min(2).trim(),
    synopsis: yup.string().required().min(4).trim(),
    price: yup.number().positive().min(0.01).required(),
    trailer_code: yup.string().min(4).trim()
  })

  const initialValues = {
    film: undefined,
    poster: undefined,
    title: '',
    synopsis: '',
    price: 0,
    trailer_code: ''
  }

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
                error={Boolean(formik.errors.film)} id='movie_film'
                title={<Translation target='MOVIE_CREATE_FILM_TITLE' />}
                preview={props.film} accept='video/webm, video/mp4' isImageFullWidth name='film'
                helpText={<Translation target='MOVIE_CREATE_FILM_HELP_TEXT' />}
                handleChange={async (e) => {
                  formik.handleChange(e)
                  const file = e.target.files[0]
                  const cover = await File.getVideoCover(file)
                  props.setFilm(URL.createObjectURL(cover))
                  formik.setFieldValue('film', file)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <ImagePicker
                error={Boolean(formik.errors.poster)} id='movie_poster'
                title={<Translation target='MOVIE_CREATE_POSTER_TITLE' />}
                preview={props.poster} accept='image/jpeg, image/png, image/jpg, image/gif'
                name='poster'
                helpText={<Translation target='MOVIE_CREATE_POSTER_HELP_TEXT' />}
                handleChange={(e) => {
                  formik.handleChange(e)
                  const file = e.target.files[0]
                  props.setPoster(URL.createObjectURL(file))
                  formik.setFieldValue('poster', file)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                id='movie_title' label={<Translation target='MOVIE_CREATE_NAME' />}
                variant='standard' name='title'
                helperText={<Translation target='MOVIE_CREATE_NAME_HELP_TEXT' />}
                error={Boolean(formik.errors.title)}
                onChange={(e) => {
                  props.setTitle(e.target.value)
                  formik.setFieldValue('title', e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                id='movie_synopsis' label={<Translation target='MOVIE_CREATE_DESCRIPTION' />}
                variant='standard' name='synopsis'
                helperText={<Translation target='MOVIE_CREATE_DESCRIPTION_HELP_TEXT' />}
                error={Boolean(formik.errors.synopsis)} onChange={formik.handleChange}
                multiline rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <MovieCreateBidWrapper>
                <InputTextField
                  type='number' name='price'
                  helperText={<Translation target='MOVIE_CREATE_BID_HELP_TEXT' />}
                  id='movie_minimum_price' label={<Translation target='MOVIE_CREATE_BID' />}
                  variant='standard'
                  error={Boolean(formik.errors.price)}
                  onChange={(e: any) => {
                    formik.handleChange(e)
                    props.setPrice(e.target.value)
                    formik.setFieldValue('price', e.target.value)
                  }}
                />
                <MovieCreateBidText variant='body2'>ETH</MovieCreateBidText>
              </MovieCreateBidWrapper>
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                id='movie_trailer_code' label={<Translation target='MOVIE_CREATE_TRAILER' />}
                variant='standard' error={Boolean(formik.errors.trailer_code)}
                onChange={formik.handleChange} name='trailer_code'
              />
            </Grid>
            <Grid item xs={12}>
              <InputSwitch
                label={<Translation target='MOVIE_CREATE_FREE_MINTING' />} defaultChecked
                subtitle={<Translation target='MOVIE_CREATE_FREE_MINTING_HELP_TEXT' />}
              />
            </Grid>
            <Grid item xs={6}>
              <LightTooltip TransitionComponent={Zoom} title={(account === null) ? <Translation target='MOVIE_CREATE_ADD_BUTTON_TOOLTIP' /> : ''}>
                <Box>
                  <Button
                    type='submit' variant='contained' color='primary' fullWidth
                    onClick={handleOpen} disableElevation size='large' sx={{ mt: 3 }}
                    disabled={formik.isSubmitting || account === null}
                  >
                    <Translation target='MOVIE_CREATE_ADD_BUTTON' />
                  </Button>
                </Box>
              </LightTooltip>
            </Grid>
            <MovieCreateModalProgress open={open} progress={props.progress ?? 0} handleClose={handleClose} />
          </Grid>
        </Box>
      )}
    </Formik>
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
