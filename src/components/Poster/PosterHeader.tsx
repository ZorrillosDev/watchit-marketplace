// REACT IMPORTS
import React, { FC, useState } from 'react';

// MUI IMPORTS
import {
  AvatarGroup, styled,
  IconButton, Menu, MenuItem, Box, BoxProps,
} from '@mui/material';

// PROJECT IMPORTS
import { MoreHoriz } from '@components/Icons';
import { PixelArtIdenticon } from '@components/Identicon';

// ===========================|| POSTER HEADER ||=========================== //

export interface PosterHeaderProps {
  creator: string
}

export const PosterHeader: FC<PosterHeaderProps> = (props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <PosterHeaderWrapper>
        <AvatarGroup max={2}>
          <PixelArtIdenticon seed={props.creator} />
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
            horizontal: 'right',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
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
  );
};

export const PosterHeaderWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0.4rem 0.9rem 0.2rem',
}));
