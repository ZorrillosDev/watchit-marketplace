// REACT IMPORTS
import React, { FC, useCallback, useState } from 'react'

// PROJECT IMPORTS
import MovieProfileAcceptOfferView from '@pages/Movie/components/MovieProfileAcceptOffer/MovieProfileAcceptOfferView'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'
import { useEthers } from '@usedapp/core'
import { Movie, MovieBid } from '@state/movies/types'
import { connect, RootStateOrAny } from 'react-redux'
import { Web3Actions, Web3State } from '@state/web3/types'
import { setApprovalFor } from '@state/web3/actions'
import { selectWeb3Result } from '@state/web3/selector'

// ===========================|| ACCEPT OFFER - CONTAINER ||=========================== //

export type MovieProfileAcceptOfferContainerProps = {
  compact?: boolean
  buttonSx?: SxProps<Theme>
} & Web3Actions & Movie & MovieBid & Web3State

const MovieProfileAcceptOfferContainer: FC<MovieProfileAcceptOfferContainerProps> = (props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const { account } = useEthers()

  const {
    setApprovalFor,
    result
  } = props

  const handleAcceptOffer = useCallback((): void => {
    if (account === undefined) return

    setIsLoading(true)
    setApprovalFor({
      operator: props.account,
      tokenId: props.token,
      approved: props.price.toString()
    })

    if (result?.status !== undefined) { setIsLoading(false) }
  }, [account])

  return (
    <MovieProfileAcceptOfferView
      {...{ ...props, isLoading, handleAcceptOffer }
      }
    />
  )
}

const mapDispatchToProps: Partial<Web3Actions> = { setApprovalFor }
const mapStateToProps = (state: RootStateOrAny): Partial<Web3State> => {
  const result = selectWeb3Result(state)
  return { result }
}

export const MovieProfileAcceptOffers = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieProfileAcceptOfferContainer)
