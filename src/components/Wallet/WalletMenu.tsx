// REACT IMPORTS
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

// MUI IMPORTS
import {
  CardContent, GridProps, ListItemButton,
  Popper, Typography, styled, ListProps,
  Grid, List, ListItemIcon, ListItemText, Paper,
  CardContentProps,
} from '@mui/material';

// THIRD PARTY IMPORTS
import { VirtualElement } from '@popperjs/core';

// PROJECT IMPORTS
import Transitions from '@components/Transitions';
import { MainCard } from '@components/Cards';
import scroller from '@styles/scroller';
import { SxProps, Theme } from '@mui/system';
import { Translation } from '@src/i18n';
import { IconLogout, IconSettings } from '@components/Icons';
import { PROFILE, SETTINGS } from '@navigation/CONSTANTS';
import { String } from '@src/utils';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| WALLET - MENU ||=========================== //

export interface WalletMenuProps {
  deactivate: () => void
  open: boolean
  hash?: string | null
  handleClose: () => void
  anchorRef: VirtualElement | null
}

const WalletMenu: FC<WalletMenuProps> = (props): JSX.Element => {
  // const theme = useTheme();
  // const colorMode = useContext(ColorModeContext);
  const handleLogOut = () => {
    props.deactivate();
    props.handleClose();
  };

  return (
    <Popper
      placement='bottom-start'
      open={props.open}
      anchorEl={props?.anchorRef}
      role={undefined}
      transition
      id='wallet_menu'
      disablePortal
      popperOptions={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 5],
            },
          },
        ],
      }}
    >
      {({ TransitionProps }) => (
        <Transitions in={props.open} {...TransitionProps}>
          <Paper>
            <MainCard border={false} elevation={16} content={false} sx={WalletMenuCardSx}>
              <WalletMenuCardContent>
                <Grid container direction='column' spacing={1} sx={{ pl: 1 }}>
                  <WalletMenuContent item xs={12}>
                    <Link to={PROFILE}>
                      <ListItemButton
                        sx={{ borderRadius: (theme) => theme.shape.borderRadius }}
                      >
                        <Grid container direction='column' spacing={0}>
                          <Grid item sx={{ display: 'flex' }}>
                            <Typography variant='h4'><Translation target='GLOBAL_MORNING' />, </Typography>
                            <Typography component='span' variant='h4' fontWeight={400} sx={{ ml: '4px' }}>
                              Jacob Peralta
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant='subtitle2'>
                              { props.hash ? String.minifyHash(props.hash) : '' }
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItemButton>
                    </Link>
                    <HeaderProfileNavWrapper component='nav' sx={{ a: { textDecoration: 'none !important' } }}>
                      {/*<SubCard*/}
                      {/*  sx={{ p: '8px 16px', cursor: 'pointer' }} contentSx={{ p: '0 !important' }}*/}
                      {/*  onClick={() => colorMode.toggleColorMode()} content*/}
                      {/*>*/}
                      {/*  <Grid container alignItems='center' justifyContent='space-between' sx={{ ml: 0 }}>*/}
                      {/*    <Typography variant='body2'>Set {theme.palette.mode === 'dark' ? 'light' : 'dark'} theme</Typography>*/}
                      {/*    <IconButton color='inherit'>*/}
                      {/*      {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}*/}
                      {/*    </IconButton>*/}
                      {/*  </Grid>*/}
                      {/*</SubCard>*/}
                      <Link to={SETTINGS}>
                        <ListItemButton
                         sx={{ borderRadius: (theme) => theme.shape.borderRadius, mt: '5px' }}
                        >
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size='1.5rem' />
                          </ListItemIcon>
                        <ListItemText primary={<Typography variant='body2'><Translation target='GLOBAL_ACCOUNT_SETTINGS' /></Typography>} />
                       </ListItemButton>
                      </Link>
                      <ListItemButton
                        sx={{ borderRadius: (theme) => theme.shape.borderRadius, mt: '5px' }}
                        onClick={handleLogOut}
                      >
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size='1.3rem' />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant='body2'><Translation target='GLOBAL_LOGOUT' /></Typography>} />
                      </ListItemButton>
                    </HeaderProfileNavWrapper>
                  </WalletMenuContent>
                </Grid>
              </WalletMenuCardContent>
            </MainCard>
          </Paper>
        </Transitions>
      )}
    </Popper>
  );
};

const WalletMenuCardSx: SxProps<Theme> = {
  borderRadius: '10px',
  boxShadow: 'rgba(0,0,0,0.16) 0px 4px 16px',
  '&:hover': {
    boxShadow: 'rgba(0,0,0,0.16) 0px 4px 16px',
  },
};

const WalletMenuCardContent = styled(CardContent)<CardContentProps>(() => ({
  padding: '16px 0 16px 10px !important',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const WalletMenuContent = styled(Grid)<GridProps>(({ theme }) => ({
  height: 1,
  maxHeight: 'calc(100vh - 205px)',
  overflowX: 'hidden',
  padding: '0px !important',
  ...scroller(theme),
}));

const HeaderProfileNavWrapper = styled(List)<ListProps & { component: string }>(({ theme }) => ({
  width: '100%',
  maxWidth: '350px',
  minWidth: '300px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  paddingBottom: '0',
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));

export default WalletMenu;
