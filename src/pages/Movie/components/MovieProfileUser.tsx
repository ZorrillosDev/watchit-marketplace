// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  Box, Chip, ChipProps, styled,
  Typography, TypographyProps
} from '@mui/material'

// PROJECT IMPORTS
import { PixelArtIdenticon } from '@components/Identicon'
import { String } from '@src/utils'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| MOVIE - PROFILE - USER ||=========================== //

const MovieProfileUser: FC<{ address: string, full?: boolean }> = (props): JSX.Element => {
  return (
      <MovieProfileUserChip
          icon={<PixelArtIdenticon seed={props.address} size={35}/>}
          label={(
              <Box display='flex' flexDirection='column' paddingRight={1}>
                <MovieProfileAddressTypography variant='body1'>
                  {props.full ? props.address : String.minifyHash(props.address)}
                </MovieProfileAddressTypography>
              </Box>
          )}
      variant='outlined'
      aria-haspopup='true'
      color='primary'
    />
  )
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
