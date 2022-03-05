// REACT IMPORTS
import React, {FC, useCallback, useState} from 'react'

// PROJECT IMPORTS
import MovieProfileAcceptOfferView from '@pages/Movie/components/MovieProfileAcceptOffer/MovieProfileAcceptOfferView'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'
import { useEthers } from '@usedapp/core'

// ===========================|| ACCEPT OFFER - CONTAINER ||=========================== //

export interface MovieProfileAcceptOfferContainerProps {
  price: number
  candidate: string
  compact?: boolean
  buttonSx?: SxProps<Theme>
}

export const MovieProfileAcceptOfferContainer: FC<MovieProfileAcceptOfferContainerProps> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const {account} = useEthers()

  const handleAcceptOffer = useCallback((): void => {
    if (account === undefined) {
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [account])

  return <MovieProfileAcceptOfferView {...{ ...props, isLoading, handleAcceptOffer }} />
}
