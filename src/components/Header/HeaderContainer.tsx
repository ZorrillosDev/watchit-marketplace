// react imports
import React, { FC } from 'react'

// project imports
import HeaderView from '@components/Header/HeaderView'

// ===========================|| HEADER CONTAINER ||=========================== //

export const HeaderContainer: FC = (): JSX.Element => {
  const onSearch = (searchText: string): void => {
    console.log(searchText)
  }

  return <HeaderView {...{ onSearch }} />
}
