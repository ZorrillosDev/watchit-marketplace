import React, { FC } from 'react'
import HeaderView from '@components/Header/HeaderView'

export const HeaderContainer: FC = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const handleToggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  const onSearch = (searchText: string): void => {
    console.log(searchText)
  }

  return <HeaderView {...{ isMenuOpen, handleToggleMenu, onSearch }} />
}
