// REACT IMPORTS
import React, { FC, useState } from 'react'

// PROJECT IMPORTS
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'
import {useEthers} from '@usedapp/core'
import MovieProfilePayView from '@pages/Movie/components/MovieProfilePay/MovieProfilePayView'

// ===========================|| MOVIE PROFILE PAY - CONTAINER ||=========================== //

interface MovieProfilePayContainerProps {
  price: number
  title: string
  buttonSx?: SxProps<Theme>
}

export const MovieProfilePayContainer: FC<MovieProfilePayContainerProps> = ({ buttonSx, price, title }): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const { account } = useEthers()

  const handlePay = (): void => {
    if (account === undefined) { return }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return <MovieProfilePayView {...{ buttonSx, isLoading, handlePay, price, title }} />
}
