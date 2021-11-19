// react imports
import React, { FC } from 'react'

// project imports
import HeaderSearch, { HeaderSearchProps } from '@components/Header/HeaderSearch'
import Menu from '@components/Header/HeaderMenu'
import LogoPng from '@assets/icons/icon.png'

// mui imports
import { useTheme } from '@mui/material/styles'
import {
  Toolbar, AppBar, Box,
  useMediaQuery, Container
} from '@mui/material'

// ===========================|| HEADER - VIEW ||=========================== //

export interface HeaderProps {
  isMenuOpen: boolean
  handleToggleMenu: () => void
}

const HeaderView: FC<HeaderProps & HeaderSearchProps> = (props): JSX.Element => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <AppBar
        sx={{
          transform: !isMobile || (props.isMenuOpen && isMobile) ? 'none !important' : 'auto',
          visibility: !isMobile || (props.isMenuOpen && isMobile) ? 'visible' : 'unset',
          backgroundColor: (theme) => theme.palette.background.default
        }}
      >
        <Container>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Box
              component='img' alt='Logo Image' src={LogoPng}
              sx={{ maxWidth: '50px', transform: 'translateY(-1px)' }}
            />
            <HeaderSearch onSearch={props.onSearch} />
            <Menu {...props} />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default HeaderView
