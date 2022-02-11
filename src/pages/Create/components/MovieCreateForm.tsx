// REACT IMPORTS
import React, {FC} from 'react'

// THIRD PARTY IMPORTS
import * as yup from 'yup'

// MUI IMPORTS
import {
    Box, BoxProps, Button, Grid, LinearProgress, styled,
    Typography, TypographyProps
} from '@mui/material'

// PROJECT IMPORTS
import {InputSwitch} from '@components/Inputs'
import ImagePicker from '@components/ImagePicker'
import {Translation} from '@src/i18n'
import {InputTextField} from '@components/Inputs/InputTextField'
import {File} from '@src/utils'
import {Formik} from "formik";
import {MovieCreateViewProps} from "@pages/Create/MovieCreateView";

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| MOVIE - CREATE - FORM ||=========================== //

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
    name: yup.string().required().min(2).trim(),
    description: yup.string().required().min(4).trim(),
    bid: yup.number().positive().min(0.01).required(),
    trailer: yup.string().min(4).trim(),
})

export interface ModalBalanceFormProps extends MovieCreateViewProps {
    poster: string
    progress?: number,
    film: string
    setPoster: (p: string) => void
    setFilm: (p: string) => void
    setName: (p: string) => void
    setBid: (p: number) => void
}

const MovieCreateForm: FC<ModalBalanceFormProps> = (props): JSX.Element => {
    return (
        <Formik
            onSubmit={props.onSubmit}
            validationSchema={validationSchema}
            initialValues={{
                film: undefined,
                poster: undefined,
                name: '',
                description: '',
                bid: 0,
                trailer: '',
            }}

            render={({errors, handleSubmit, handleChange, setFieldValue}) => {
                return (
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        method='post'
                        encType='multipart/form-data'
                        sx={{mb: {xs: 0, sm: 8}}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <ImagePicker
                                    error={Boolean(errors.film)} id='movie_film'
                                    title={<Translation target='MOVIE_CREATE_FILM_TITLE'/>}
                                    preview={props.film} accept='video/webm, video/mp4' isImageFullWidth name='film'
                                    helpText={<Translation target='MOVIE_CREATE_FILM_HELP_TEXT'/>}
                                    handleChange={async (e) => {
                                        handleChange(e)
                                        const file = e.target.files[0]
                                        const cover = await File.getVideoCover(file)
                                        props.setFilm(URL.createObjectURL(cover))
                                        setFieldValue('film', file)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ImagePicker
                                    error={Boolean(errors.poster)} id='movie_poster'
                                    title={<Translation target='MOVIE_CREATE_POSTER_TITLE'/>}
                                    preview={props.poster} accept='image/jpeg, image/png, image/jpg, image/gif'
                                    name='poster'
                                    helpText={<Translation target='MOVIE_CREATE_POSTER_HELP_TEXT'/>}
                                    handleChange={(e) => {
                                        handleChange(e)
                                        const file = e.target.files[0]
                                        props.setPoster(URL.createObjectURL(file))
                                        setFieldValue('poster', file)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputTextField
                                    id='movie_name' label={<Translation target='MOVIE_CREATE_NAME'/>} variant='standard'
                                    name='name'
                                    helperText={<Translation target='MOVIE_CREATE_NAME_HELP_TEXT'/>}
                                    error={Boolean(errors.name)}
                                    onChange={(e) => {
                                        props.setName(e.target.value)
                                        setFieldValue('name', e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputTextField
                                    id='movie_description' label={<Translation target='MOVIE_CREATE_DESCRIPTION'/>}
                                    variant='standard' name='description'
                                    helperText={<Translation target='MOVIE_CREATE_DESCRIPTION_HELP_TEXT'/>}
                                    error={Boolean(errors.description)} onChange={handleChange}
                                    multiline rows={2}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MovieCreateBidWrapper>
                                    <InputTextField
                                        type='number' name='bid'
                                        helperText={<Translation target='MOVIE_CREATE_BID_HELP_TEXT'/>}
                                        id='movie_minimum_bid' label={<Translation target='MOVIE_CREATE_BID'/>}
                                        variant='standard'
                                        error={Boolean(errors.bid)}
                                        onChange={(e: any) => {
                                            handleChange(e)
                                            props.setBid(e.target.value)
                                            setFieldValue('bid', e.target.value)
                                        }}
                                    />
                                    <MovieCreateBidText variant='body2'>ETH</MovieCreateBidText>
                                </MovieCreateBidWrapper>
                            </Grid>
                            <Grid item xs={12}>
                                <InputTextField
                                    id='movie_trailer' label={<Translation target='MOVIE_CREATE_TRAILER'/>}
                                    variant='standard'
                                    error={Boolean(errors.trailer)} onChange={handleChange} name='trailer'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputSwitch
                                    label={<Translation target='MOVIE_CREATE_FREE_MINTING'/>} defaultChecked
                                    subtitle={<Translation target='MOVIE_CREATE_FREE_MINTING_HELP_TEXT'/>}
                                />
                            </Grid>

                            {
                                props.progress ?
                                    <Grid item xs={12}>
                                        <LinearProgress variant="determinate" value={50}/>
                                        <small>Uploading...</small>
                                    </Grid> :
                                    <></>
                            }

                            <Grid item xs={6}>
                                <Button
                                    type='submit' variant='contained' color='primary' fullWidth
                                    disableElevation size='large' sx={{mt: 3}}
                                >
                                    <Translation target='MOVIE_CREATE_ADD_BUTTON'/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )
            }}

        />
    )
}

const MovieCreateBidWrapper = styled(Box)<BoxProps>(() => ({
    width: '100%',
    position: 'relative',
    input: {
        paddingRight: '3rem'
    }
}))

const MovieCreateBidText = styled(Typography)<TypographyProps>(({theme}) => ({
    position: 'absolute',
    right: 0,
    color: theme.palette.text.primary,
    fontWeight: 600,
    bottom: '26px'
}))

export default MovieCreateForm
