// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  Grid,
  Box, styled, Chip, ChipProps
} from '@mui/material'

// PROJECT IMPORTS
import TruncatedTypography from '@components/TruncatedTypography'
import { User } from '@state/users/types'
import { PixelArtIdenticon } from '@components/Identicon'
import { String } from '@src/utils'

// ===========================|| HOME - CREATORS ||=========================== //
export const HomeCreatorsView: FC<{ user: User }> = ({ user }): JSX.Element => {
  return (
    <Grid item xs={6} sm={4} md={3} lg={2}>
      <HomeCreatorChip
        icon={<PixelArtIdenticon seed={user.address} />}
        label={(
          <Box display='flex' flexDirection='column' paddingRight={1}>
            <TruncatedTypography gutterBottom variant='body1' lines={1}>
              {String.minifyHash(user.address, 12)}
            </TruncatedTypography>
            <TruncatedTypography
              gutterBottom variant='body1'
              sx={{ opacity: 0.5 }} lines={1}
            >
              Minted movies: {user.movies ?? 0}
            </TruncatedTypography>
          </Box>
        )}
        variant='outlined'
        aria-haspopup='true'
        color='primary'
      />
    </Grid>
  )
}

const HomeCreatorChip = styled(Chip)<ChipProps>(({ theme }) => ({
  height: '48px',
  width: '100%',
  alignItems: 'center',
  borderRadius: '3rem',
  border: 'none',
  transition: 'all .2s ease-in-out',
  display: 'flex',
  justifyContent: 'flex-start',
  cursor: 'pointer',
  '.MuiChip-label, p': {
    margin: 0
  }
}))
