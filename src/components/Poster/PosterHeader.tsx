// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  Avatar, AvatarGroup, styled,
  IconButton, Menu, MenuItem, Tooltip, Box, BoxProps
} from '@mui/material'

// PROJECT IMPORTS
import { MoreHoriz } from '@components/Icons'

// ===========================|| POSTER HEADER ||=========================== //

export interface PosterHeaderProps {
  creator: {
    username: string
    profileUrl: string
  }
  owner: {
    username: string
    profileUrl: string
  }
}

export const PosterHeader: FC<PosterHeaderProps> = (props): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <>
      <PosterHeaderWrapper>
        <AvatarGroup max={2}>
          <Tooltip title={`Owner: ${props.owner.username}`}>
            <Avatar
              alt={`${props.owner.username} profile image`}
              src={`${props.owner.profileUrl}`} sx={{ width: 24, height: 24 }}
            />
          </Tooltip>
          <Tooltip title={`Creator: ${props.creator.username}`}>
            <Avatar
              alt={`${props.creator.username} profile image`}
              src={`${props.creator.profileUrl}`} sx={{ width: 24, height: 24 }}
            />
          </Tooltip>
        </AvatarGroup>
        <IconButton aria-label='settings' onClick={handleClick} size='small'>
          <MoreHoriz />
        </IconButton>
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
      </PosterHeaderWrapper>
    </>
  )
}

export const PosterHeaderWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0.4rem 0.9rem 0.2rem'
}))
