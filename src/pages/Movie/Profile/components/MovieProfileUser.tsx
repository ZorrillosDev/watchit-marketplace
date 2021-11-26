// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  Box, Chip, ChipProps, styled,
  Typography, TypographyProps
} from '@mui/material'

// PROJECT IMPORTS
import { PixelArtIdenticon } from '@components/Identicon'
import { User } from '@state/types/user'
import { String } from '@src/utils'
import { Translation } from '@src/i18n'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| MOVIE - PROFILE - USER ||=========================== //

export interface MovieProfileUserProps extends User {
  showMovies?: boolean
}

const MovieProfileUser: FC<MovieProfileUserProps> = (props): JSX.Element => {
  return (
    <MovieProfileUserChip
      icon={<PixelArtIdenticon seed={props?.address} size={35} />}
      label={(
        <Box display='flex' flexDirection='column' paddingRight={1}>
          <MovieProfileAddressTypography variant='body1'>
            {props?.address}
          </MovieProfileAddressTypography>
          <Typography gutterBottom variant='body1' sx={{ opacity: 0.5 }}>
            {
              props.showMovies &&
                <>
                  <Translation target='MOVIE_PROFILE_MINTED' />
                  {props?.movies}
                </>
            }
          </Typography>
        </Box>
      )}
      variant='outlined'
      aria-haspopup='true'
      color='primary'
    />
  )
}

MovieProfileUser.defaultProps = {
  showMovies: true
}

export default MovieProfileUser

const MovieProfileUserChip = styled(Chip)<ChipProps>(() => ({
  height: '48px',
  width: 'calc(100% - 1rem)',
  alignItems: 'center',
  borderRadius: '3rem',
  border: 'none',
  display: 'flex',
  justifyContent: 'flex-start',
  cursor: 'pointer',
  '.MuiChip-label, p:last-of-type': {
    margin: 0,
    width: '100%',
    overflow: 'visible'
  }
}))

const MovieProfileAddressTypography = styled(Typography)<TypographyProps>(() => ({
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}))
