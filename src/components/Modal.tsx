import React, { FC, ReactElement } from 'react'
import { Modal as ModalMui, WithTheme, withTheme } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import styled from 'styled-components'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
)

interface ModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: ReactElement
}

const Modal: FC<ModalProps> = (props): JSX.Element => {
  const classes = useStyles()
  return (
    <ModalMui
      className={classes.modal}
      open={props.isOpen}
      onClose={props.onClose}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      closeAfterTransition
    >
      <ModalWrapper>
        <ModalHeader>
          <ModalTitle>
            {props.title}
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          {props.children}
        </ModalBody>
      </ModalWrapper>
    </ModalMui>
  )
}

export default Modal

export const ModalHeader = withTheme(
  styled.header<WithTheme>`
    text-align: center;
    padding: ${({ theme }) => theme.spacing(1, 1)};
    background-color: ${({ theme }) => theme.palette.primary.light};
  `
)

export const ModalTitle = withTheme(
  styled.h3<WithTheme>`
    margin: 0;
    color: ${({ theme }) => theme.palette.primary.contrastText};
  `
)

export const ModalWrapper = styled.div``

export const ModalBody = withTheme(
  styled.section<WithTheme>`
    border: none;
    background-color: ${({ theme }) => theme.palette.background.paper};
  `
)
