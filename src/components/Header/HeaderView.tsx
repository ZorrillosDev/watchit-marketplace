// react imports
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

// project imports
import Menu from '@components/Header/HeaderMenu'
import LogoPng from '@assets/icons/icon.png'

// mui imports
import { useTheme } from '@mui/material/styles'
import {
  Toolbar, AppBar, Box,
  useMediaQuery, Container
} from '@mui/material'
import Search from '@components/Search'

// ===========================|| HEADER - VIEW ||=========================== //

const HeaderView: FC = (): JSX.Element => {
  const theme = useTheme()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleToggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <AppBar
        sx={{
          transform: !isMobile || (isMenuOpen && isMobile) ? 'none !important' : 'auto',
          visibility: !isMobile || (isMenuOpen && isMobile) ? 'visible' : 'unset',
          backgroundColor: (theme) => theme.palette.background.default
        }}
      >
        <Container>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Box
                component='img' alt='Logo Image' src={LogoPng}
                sx={{ maxWidth: '50px', transform: 'translateY(-1px)' }}
              />
            </Link>
            <Search />
            <Menu {...{ isMenuOpen, handleToggleMenu }} />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default HeaderView
