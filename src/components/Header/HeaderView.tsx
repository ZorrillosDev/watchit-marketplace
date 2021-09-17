import React, { FC } from 'react'
import Logo from '@src/components/Logo'
import { Toolbar, AppBar } from '@material-ui/core'
import Slide from '@material-ui/core/Slide'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import styled from 'styled-components'
import Search, { SearchProps } from '@components/Header/HeaderSearch'
import Menu from '@components/Header/HeaderMenu'

export interface HeaderProps {
  isMenuOpen: boolean
  handleToggleMenu: () => void
}

const HeaderView: FC<HeaderProps & SearchProps> = (props): JSX.Element => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      <TopHeaderWrapper color='transparent' open={props.isMenuOpen}>
        <TopHeaderContent>
          <Logo />
          <Search onSearch={props.onSearch} />
          <Menu {...props} />
        </TopHeaderContent>
      </TopHeaderWrapper>
    </Slide>
  )
}

export const TopHeaderWrapper = styled(AppBar)<{open: boolean}>`
  transform: ${({ open }) => open ? 'none !important' : 'auto'};
  visibility: ${({ open }) => open ? 'visible !important' : 'auto'};
`

const TopHeaderContent = styled(Toolbar)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 600px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1200px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media (min-width: 1400px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media (min-width: 1900px) {
    padding-left: 10rem;
    padding-right: 10rem;
  }
`

export default HeaderView
