// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  Grid,
  Typography,
  Container,
  styled,
  Chip,
  ChipProps,
  Avatar,
  AvatarProps,
  Box
} from '@mui/material'

// PROJECT IMPORTS
// TODO delete this when data comes from backend
import { FAKE_CREATORS } from '@src/config'
import TruncatedTypography from '@components/TruncatedTypography'

// ===========================|| HOME - CREATORS ||=========================== //

const HomeCreators: FC = (): JSX.Element => {
  return (
    <Container>
      <Grid spacing={6} container alignItems='center' justifyContent='center'>
        <Grid item xs={12}>
          <Typography variant='h2' color='text.primary' fontWeight={600}>
            Recent Creators
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} display='flex' flexWrap='wrap' justifyContent='space-between'>
            {
              FAKE_CREATORS.map((creator) => {
                return (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={creator.username}>
                    <HomeCreatorChip
                      icon={
                        <HomeCreatorAvatar src={creator.profileUrl} aria-haspopup='true' color='inherit' />
                      }
                      label={(
                        <Box display='flex' flexDirection='column' paddingRight={1}>
                          <TruncatedTypography gutterBottom variant='body2' lines={1}>
                            {creator.name}
                          </TruncatedTypography>
                          <TruncatedTypography gutterBottom variant='body1' sx={{ opacity: 0.5 }} lines={1}>
                            0x00000000
                          </TruncatedTypography>
                        </Box>
                      )}
                      variant='outlined'
                      aria-haspopup='true'
                      color='primary'
                    />
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomeCreators

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
    margin: 0,
  }
}))

const HomeCreatorAvatar = styled(Avatar)<AvatarProps>(() => ({
  cursor: 'pointer',
  width: '34px',
  height: '34px',
  fontSize: '1.2rem',
  margin: '8px 0 8px 8px !important'
}))
