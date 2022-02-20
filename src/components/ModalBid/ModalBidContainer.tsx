// REACT IMPORTS
import React, { FC, useState } from 'react'

// PROJECT IMPORTS
import ModalBidView from '@components/ModalBid/ModalBidView'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material'

// ===========================|| MODAL BID - CONTAINER ||=========================== //

interface ModalBidContainerProps {
  buttonSx?: SxProps<Theme>
}

export const ModalBidContainer: FC<ModalBidContainerProps> = ({ buttonSx }): JSX.Element => {
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

  return <ModalBidView {...{ isOpen, onOpen, onClose, buttonSx, isLoading, handleSetBid }} title='Jackass Forever' />
}
