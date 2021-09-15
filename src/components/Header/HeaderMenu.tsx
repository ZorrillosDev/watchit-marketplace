import React, { FC } from 'react'
import { WalletButton } from '@src/components/Button'
import styled, { css } from 'styled-components'
import { EXPLORE, FESTIVAL, SELL, WORK } from '@navigation/CONSTANTS'
import { Menu as MenuIcon, ChevronRight as ChevronRightIcon } from '@components/Icons'
import {
  withTheme, WithTheme, Hidden,
  Backdrop as BackdropMui, Drawer,
  Divider, IconButton
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import i18n from '@src/i18n'

export interface HeaderMenuProps {
  isMenuOpen: boolean
  handleToggleMenu: () => void
}

const HeaderMenu: FC<HeaderMenuProps> = (props): JSX.Element => {
  return (
    <>
      <Hidden smDown>
        <HeaderMenuContent />
      </Hidden>
      <Hidden mdUp>
        <IconButton
          color='primary'
          onClick={() => props.handleToggleMenu()}
        >
          <MenuIcon />
        </IconButton>
        <Backdrop open={props.isMenuOpen} onClick={props.handleToggleMenu} />
        <Drawer
          variant='persistent'
          anchor='right'
          open={props.isMenuOpen}
        >
          <MenuMobileHeader>
            <IconButton
              color='primary'
              onClick={() => props.handleToggleMenu()}
            >
              <ChevronRightIcon />
            </IconButton>
          </MenuMobileHeader>
          <Divider />
          <HeaderMenuContent />
        </Drawer>
      </Hidden>
    </>
  )
}

const HeaderMenuContent: FC = (): JSX.Element => {
  return (
    <Nav>
      <Link to={EXPLORE}>
        <Item>{i18n.t('GLOBAL_EXPLORE')}</Item>
      </Link>
      <Link to={FESTIVAL}>
        <Item>{i18n.t('GLOBAL_FESTIVAL')}</Item>
      </Link>
      <Link to={SELL}>
        <Item>{i18n.t('GLOBAL_SELL')}</Item>
      </Link>
      <Link to={WORK}>
        <Item>{i18n.t('GLOBAL_WORK')}</Item>
      </Link>
      <WalletButton />
    </Nav>
  )
}

const MenuMobileHeader = styled.div`
  display: flex;
  align-items: center;
  padding:  0 1rem;
  min-height: 56px;

  @media (min-width: 600px) {
    min-height: 64px;
  }
`

const Backdrop = styled(BackdropMui)`
  z-index: 0;
`

const Nav = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  margin: 0;
  padding: 0;
  
  a {
    text-decoration: none;
  }

  @media (max-width: 959px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1rem 1.5rem;
    
    button {
      margin-top: auto;
    }
  }
`

const ItemActive = css`
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.palette.primary.main};
    bottom: 4px;
    left: 0;
    z-index: 1;
  }
`

export const Item = withTheme(
  styled.li<{ active: boolean } & WithTheme>`
    color: ${({ theme }) => theme.palette.primary.main};
    position: relative;
    list-style: none;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 1.5rem 0 0;
    font-weight: bold;

    ${props => props.active && ItemActive}
    
    &:hover {
      color: ${({ theme }) => theme.palette.primary.dark};
    }

    @media (max-width: 1440px) {
      padding: 3px 1rem 0 0;
    }
    
    @media (max-width: 959px) {
      padding: 1rem;
    }
  `
)

export default HeaderMenu
