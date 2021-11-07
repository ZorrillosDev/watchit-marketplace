// mui imports
import {
  Avatar,
  AvatarGroup,
  Box, CardHeader,
  Grid,
  styled,
  Typography,
  IconButton, CardMedia,
  CardContent, Card, CardProps, CardHeaderProps, CardContentProps, Menu, MenuItem, Tooltip
} from '@mui/material'
import React, { FC } from 'react'
import { MoreHoriz } from '@mui/icons-material'
import HeartCounter from '@components/HeartCounter'
import TruncatedTypography from '@components/TruncatedTypography'

// ===========================|| POSTER ||=========================== //

export interface PosterProps {
  creator: {
    username: string
    profileUrl: string
  }
  owner: {
    username: string
    profileUrl: string
  }
  posterUrl: string
  price: number
  title: string
  description: string
  rate: number
  isFavorite: boolean
}

const Poster: FC<PosterProps & {showDetails: boolean}> = (props): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <PosterWrapper showDetails={props.showDetails}>
      {props.showDetails && (
        <>
          <PosterHeader
            avatar={
              <AvatarGroup max={2}>
                <Tooltip title={`Owner: ${props.owner.username}`}>
                  <Avatar alt={`${props.owner.username} profile image`} src={`${props.owner.profileUrl}`} sx={{ width: 24, height: 24 }} />
                </Tooltip>
                <Tooltip title={`Creator: ${props.creator.username}`}>
                  <Avatar alt={`${props.creator.username} profile image`} src={`${props.creator.profileUrl}`} sx={{ width: 24, height: 24 }} />
                </Tooltip>
              </AvatarGroup>
            }
            action={
              <IconButton aria-label='settings' onClick={handleClick}>
                <MoreHoriz />
              </IconButton>
            }
          />
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <MenuItem onClick={handleClose}>
              Purchase
            </MenuItem>
            <MenuItem onClick={handleClose}>
              Share
            </MenuItem>
            <MenuItem onClick={handleClose}>
              Report
            </MenuItem>
          </Menu>
        </>
      )}
      <PosterMediaContent showDetails={props.showDetails}>
        <CardMedia
          component='img' image={`${props.posterUrl}`} alt={`${props.title}`}
          sx={{ pointerEvents: 'none', userSelect: 'none' }}
        />
      </PosterMediaContent>
      {props.showDetails && (
        <PosterContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TruncatedTypography variant='body2' color='primary.dark' fontWeight={600} lines={1} sx={{ mt: 0 }}>
                {`${props.title}`}
              </TruncatedTypography>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' alignItems='center'>
                <Typography variant='body1' display='inline' color='text.primary' fontWeight='bold'>{props.price} ETH</Typography>
              </Box>
            </Grid>
            <Grid item display='flex' alignItems='center' justifyContent='flex-end' xs={6}>
              <HeartCounter count={props.rate} favorite={props.isFavorite} />
            </Grid>
          </Grid>
        </PosterContent>
      )}
    </PosterWrapper>
  )
}

export default Poster

export const PosterWrapper = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'showDetails'
})<CardProps & {showDetails: boolean}>(({ theme, showDetails }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  boxShadow: showDetails ? '0 3px 6px rgba(0,0,0,0.16)' : '',
  cursor: 'pointer',
  width: '100%',
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-1rem)'
  }
}))

export const PosterHeader = styled(CardHeader)<CardHeaderProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0.25rem 0.5rem'
}))

export const PosterContent = styled(CardContent)<CardContentProps>(() => ({
  padding: '0.5rem !important',
  svg: {
    width: '0.9rem',
    height: '0.9rem'
  }
}))

export const PosterMediaContent = styled(CardContent, {
  shouldForwardProp: (prop) => prop !== 'showDetails'
})<CardContentProps & {showDetails: boolean}>(({ showDetails }) => ({
  padding: '0.5rem !important',
  width: '100%',
  height: '100%',
  maxHeight: showDetails ? 'calc(100% - 7rem)' : 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  img: {
    height: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',
    borderRadius: '6px',
    width: showDetails ? 'auto !important' : '100%'
  }
}))
