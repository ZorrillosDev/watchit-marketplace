// react imports
import React, { FC } from 'react'

// project imports
import HeaderSearch, { HeaderSearchProps } from '@components/Header/HeaderSearch'
import Menu from '@components/Header/HeaderMenu'
import LogoPng from '@assets/icons/icon.png'

// mui imports
import { useTheme } from '@mui/material/styles'
import {
  Toolbar, AppBar, Box, Slide,
  useMediaQuery, useScrollTrigger
} from '@mui/material'

// ===========================|| HEADER VIEW ||=========================== //

export interface HeaderProps {
  isMenuOpen: boolean
  handleToggleMenu: () => void
}

const HeaderView: FC<HeaderProps & HeaderSearchProps> = (props): JSX.Element => {
  const trigger = useScrollTrigger()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      <AppBar
        color='transparent'
        sx={{
          transform: !isMobile || (props.isMenuOpen && isMobile) ? 'none !important' : 'auto',
          visibility: !isMobile || (props.isMenuOpen && isMobile) ? 'visible' : 'unset'
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            px: { xs: 2, sm: 3, lg: 6, xl: 14 }
          }}
        >
          <Box
            component='img'
            sx={{ maxWidth: '50px', transform: 'translateY(-1px)' }}
            alt='Logo Image'
            src={LogoPng}
          />
          <HeaderSearch onSearch={props.onSearch} />
          <Menu {...props} />
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

export default HeaderView
