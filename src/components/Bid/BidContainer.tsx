// REACT IMPORTS
import React, { FC, useState } from 'react'

// PROJECT IMPORTS
import BidView from '@components/Bid/BidView'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'

// ===========================|| BID - CONTAINER ||=========================== //

interface BidContainerProps {
  buttonSx?: SxProps<Theme>
}

export const BidContainer: FC<BidContainerProps> = ({ buttonSx }): JSX.Element => {
  const [isOpen, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const onClose = (): void => setOpen(false)
  const onOpen = (): void => setOpen(true)

  const handleSetBid = (): void => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return <BidView {...{ isOpen, onOpen, onClose, buttonSx, isLoading, handleSetBid }} title='Jackass Forever' />
}
