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
import { IconEth } from '@components/Icons'
import HeartCounter from '@components/HeartCounter'

// ===========================|| POSTER ||=========================== //

interface PosterProps {
  creator: {
    username: string
    profileUrl: string
  }
  owner: {
    username: string
    profileUrl: string
  }
  posterUrl: string
  value: number
  title: string
  favoriteCount: number
  isFavorite: boolean
}

const Poster: FC<PosterProps> = (props): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <PosterWrapper>
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
      <CardMedia
        component='img'
        image={`${props.posterUrl}`}
        alt={`${props.title}`}
      />
      <PosterContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box display='flex' alignItems='center'>
              <IconEth color='primary' />
              <Typography variant='body1' display='inline' color='primary.dark' fontWeight='bold' sx={{ ml: 0.25 }}>{props.value} ETH</Typography>
            </Box>
          </Grid>
          <Grid item display='flex' alignItems='center' justifyContent='flex-end' xs={6}>
            <HeartCounter count={props.favoriteCount} favorite={props.isFavorite} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' color='primary.dark' fontWeight='bold'>{`${props.title}`}</Typography>
          </Grid>
        </Grid>
      </PosterContent>
    </PosterWrapper>
  )
}

export default Poster

export const PosterWrapper = styled(Card)<CardProps>(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
  cursor: 'pointer',
  '&, & .MuiCardMedia-root': {
    transition: 'all 0.3s ease-in-out'
  },
  '& .MuiCardMedia-root': {
    width: 'calc(100% + 1px)',
    maxHeight: '18.5rem'
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    '.MuiCardMedia-root': {
      width: 'calc(100% + 1rem)',
      marginLeft: '-0.5rem'
    }
  }
}))

export const PosterHeader = styled(CardHeader)<CardHeaderProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'absolute',
  width: '100%',
  padding: '0.25rem 0.5rem',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(255,255,255,0.8)'
}))

export const PosterContent = styled(CardContent)<CardContentProps>(() => ({
  padding: '0.5rem !important',
  svg: {
    width: '0.9rem',
    height: '0.9rem'
  }
}))
