// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Avatar, Button, ButtonProps, Grid, styled, Theme, Typography, Zoom } from '@mui/material'

// THIRD PARTY
import { IconMovie, IconHeart, IconShare } from '@tabler/icons'

// PROJECT IMPORTS
import { Fingerprint, MoreHoriz } from '@components/Icons'
import { LightTooltip } from '@components/Tooltip'
import { Translation } from '@src/i18n'
import { SxProps } from '@mui/system'

// ===========================|| MOVIE - PROFILE - HEADER ||=========================== //

const MovieProfileHeader: FC<{sx?: SxProps<Theme>}> = ({ sx }): JSX.Element => {
  return (
    <Grid item xs={12} display='flex' alignItems='center' justifyContent='space-between' sx={sx}>
      <LightTooltip TransitionComponent={Zoom} title={<Translation target='MOVIE_PROFILE_HEADER_FINGERPRINT' />}>
        <Avatar>
          <Fingerprint />
        </Avatar>
      </LightTooltip>
      <Grid container spacing={2} width='auto'>
        <Grid item>
          <MovieProfileButton
            size='small' sx={{ px: 2, py: '0.72rem', svg: { width: '1rem', height: '1rem' } }}
          >
            <IconHeart stroke={1.5} />
            <Typography sx={{ pl: 1 }}>3200</Typography>
          </MovieProfileButton>
        </Grid>
        <Grid item>
          <MovieProfileButton
            size='small'
            sx={{ px: 2, py: '0.72rem', svg: { width: '1rem', height: '1rem' } }}
          >
            <IconShare stroke={1.5} />
            <Typography sx={{ pl: 1 }}>
              <Translation target='MOVIE_PROFILE_HEADER_SHARE' />
            </Typography>
          </MovieProfileButton>
        </Grid>
        <Grid item>
          <MovieProfileButton size='small'>
            <IconMovie stroke={1} />
          </MovieProfileButton>
        </Grid>
        <Grid item>
          <MovieProfileButton size='small'>
            <MoreHoriz />
          </MovieProfileButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MovieProfileHeader

const MovieProfileButton = styled(Button)<ButtonProps>(({ theme }) => ({
  padding: '0.5rem',
  minWidth: 'auto',
  border: '1px solid',
  borderColor: theme.palette.divider,
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '0.5rem !important',
    p: {
      display: 'none'
    },
    svg: {
      width: '24px !important',
      height: '24px !important'
    }
  }
}))
