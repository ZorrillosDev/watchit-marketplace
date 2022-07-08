// react imports
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

// project imports
import { WORK, CREATE } from '@navigation/CONSTANTS';
import i18n from '@src/i18n';
import {
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
} from '@components/Icons';

// mui imports
import Wallet from '@components/Wallet';
import {
  Hidden, styled, Backdrop, Drawer, Box,
  Divider, IconButton, Grid, BoxProps,
} from '@mui/material';

// ===========================|| HEADER MENU ||=========================== //

export interface HeaderMenuProps {
  isMenuOpen: boolean
  handleToggleMenu: () => void
}

const HeaderMenu: FC<HeaderMenuProps> = (props): JSX.Element => {
  return (
    <>
      <Hidden mdDown>
        <HeaderMenuContent />
      </Hidden>
      <Hidden mdUp>
        <IconButton
          color='primary'
          onClick={() => props.handleToggleMenu()}
        >
          <MenuIcon />
        </IconButton>
        <Backdrop
          sx={{ zIndex: 0 }}
          open={props.isMenuOpen}
          onClick={props.handleToggleMenu}
        />
        <Drawer
          variant='persistent'
          anchor='right'
          open={props.isMenuOpen}
        >
          <Grid
            container
            alignItems='center'
            sx={{
              py: 0,
              px: 2,
              minHeight: { xs: '56px', sm: '64px' },
            }}
          >
            <IconButton
              color='primary'
              onClick={() => props.handleToggleMenu()}
            >
              <ChevronRightIcon />
            </IconButton>
          </Grid>
          <Divider />
          <HeaderMenuContent />
        </Drawer>
      </Hidden>
    </>
  );
};

const HeaderMenuContent: FC = (): JSX.Element => {
  return (
    <Grid
      container
      flexGrow={1}
      sx={{
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: { xs: 'flex-start', md: 'flex-end' },
        flexDirection: { xs: 'column', md: 'row' },
        m: 0,
        p: { xs: '1rem 1.5rem', md: 0 },
        '& a': {
          textDecoration: 'none',
        },
      }}
    >
      <Link to={CREATE}>
        <Item
          sx={{ fontWeight: 700, p: 2, px: { xs: 2, xl: 3 } }}
        >
          {i18n.t('GLOBAL_CREATE')}
        </Item>
      </Link>
      {/* <Link to={EXPLORE}> */}
      {/*  <Item */}
      {/*    sx={{ p: 2, px: { xs: 2, xl: 3 } }} */}
      {/*  > */}
      {/*    {i18n.t('GLOBAL_EXPLORE')} */}
      {/*  </Item> */}
      {/* </Link> */}
      {/* <Link to={FESTIVAL}> */}
      {/*  <Item */}
      {/*    sx={{ p: 2, px: { xs: 2, xl: 3 } }} */}
      {/*  > */}
      {/*    {i18n.t('GLOBAL_FESTIVAL')} */}
      {/*  </Item> */}
      {/* </Link> */}
      {/* <Link to={SELL}> */}
      {/*  <Item */}
      {/*    sx={{ p: 2, px: { xs: 2, xl: 3 } }} */}
      {/*  > */}
      {/*    {i18n.t('GLOBAL_SELL')} */}
      {/*  </Item> */}
      {/* </Link> */}
      <Link to={WORK}>
        <Item
          sx={{ p: 2, px: { xs: 2, xl: 3 } }}
        >
          {i18n.t('GLOBAL_WORK')}
        </Item>
      </Link>
      <Wallet />
    </Grid>
  );
};

export const Item = styled(Box)<{ active?: boolean } & BoxProps>(({ active, theme }) => ({
  color: theme.palette.primary.main,
  position: 'relative',
  listStyle: 'none',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 400,
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'underline',
  },
  ...(
    (active ?? false)
      ? {
        '&:after': {
          content: '',
          position: 'absolute',
          width: '100%',
          height: '1px',
          background: theme.palette.primary.main,
          bottom: '4px',
          left: 0,
          zIndex: 1,
        },
      }
      : {}
  ),
}));

export default HeaderMenu;
