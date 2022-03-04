// REACT IMPORTS
import React, { FC, useState } from 'react'

// PROJECT IMPORTS
import MovieProfileAcceptOfferView from '@pages/Movie/components/MovieProfileAcceptOffer/MovieProfileAcceptOfferView'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'
import { useEthers } from '@usedapp/core'

// ===========================|| ACCEPT OFFER - CONTAINER ||=========================== //

interface AcceptOfferContainerProps {
  price: number
  compact?: boolean
  buttonSx?: SxProps<Theme>
}

export const MovieProfileAcceptOfferContainer: FC<AcceptOfferContainerProps> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const { account } = useEthers()

  const handleAcceptOffer = (): void => {
    if (account === undefined) { return }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return <MovieProfileAcceptOfferView {...{ ...props, isLoading, handleAcceptOffer }} />
}
