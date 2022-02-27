// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  Backdrop, Box, BoxProps, Fade, Grid,
  GridProps, LinearProgress, LinearProgressProps,
  Modal, styled, Typography
} from '@mui/material'

// PROJECT IMPORTS
import { Translation } from '@src/i18n'
import LogoPng from '@assets/icons/icon.png'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| MOVIE - CREATE - MODAL - PROGRESS ||=========================== //

export interface MovieCreateModalProgressProps {
  open: boolean
  progress: number
  handleClose: () => void
}

interface MovieCreateUploadModalLogoProps {
  animated?: boolean
  component: string
  alt: string
  src: string
}

const MovieCreateModalProgress: FC<MovieCreateModalProgressProps> = (props): JSX.Element => {
  const loaded = ((props?.progress ?? 0) === 100)

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: {
          pointerEvents: ((props?.progress ?? 0) === 100) ? 'all' : 'none'
        }
      }}
    >
      <Fade in={props.open}>
        <MovieCreateUploadModalContent spacing={3} container>
          <Grid item xs={12} display='flex' alignItems='center' justifyContent='center'>
            <MovieCreateUploadModalLogo component='img' alt='Logo Image' src={LogoPng} animated={!loaded} />
          </Grid>
          {
              loaded
                ? (
                  <>
                    <Grid item xs={12}>
                      <Typography
                        variant='h3' textAlign='center'
                        sx={{ width: 1, color: (theme) => theme.palette.success.dark }}
                      >
                        <Translation target='MOVIE_CREATE_SUCCESS_UPLOADED' />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body1' color='primary' textAlign='center' sx={{ width: 1 }}>
                        <Translation target='MOVIE_CREATE_SUCCESS_UPLOADED_MESSAGE' />
                      </Typography>
                    </Grid>
                  </>
                  )
                : (
                  <>
                    <Grid item xs={12}>
                      <MovieCreateUploadModalProgress variant='determinate' value={props?.progress} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='h3' color='primary' textAlign='center' sx={{ width: 1 }}>
                        <Translation target='MOVIE_CREATE_SUCCESS_UPLOADING' />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body1' color='primary' textAlign='center' sx={{ width: 1 }}>
                        <Translation target='MOVIE_CREATE_SUCCESS_UPLOADING_MESSAGE' />
                      </Typography>
                    </Grid>
                  </>
                  )
          }
        </MovieCreateUploadModalContent>
      </Fade>
    </Modal>
  )
}

const MovieCreateUploadModalContent = styled(Grid)<GridProps>(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '1rem',
  padding: '2rem'
}))

const MovieCreateUploadModalLogo = styled(Box)<BoxProps & MovieCreateUploadModalLogoProps >(({ animated }) => ({
  maxWidth: '10rem',
  '@keyframes spin': {
    '0%, 15%': {
      transform: 'rotate(0)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  animation: animated ? 'spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite' : 'none'
}))

const MovieCreateUploadModalProgress = styled(LinearProgress)<LinearProgressProps>(({ theme }) => ({
  borderRadius: '2px',
  '.MuiLinearProgress-bar': {
    background: 'linear-gradient(90deg, red 0%, yellow 15%, lime 30%, cyan 50%, blue 65%, magenta 80%, red 100%)',
    backgroundSize: '200%',
    '@keyframes moveGradient': {
      '0%': {
        backgroundPosition: '0% 0%'
      },
      '100%': {
        backgroundPosition: '-200% 0%'
      }
    },
    animation: 'moveGradient 5s linear infinite'
  }
}))

export default MovieCreateModalProgress
