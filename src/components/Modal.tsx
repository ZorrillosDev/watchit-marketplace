// REACT IMPORTS
import React, { FC, ReactElement, useState, createContext } from 'react';

// MUI IMPORTS
import {
  Box, Modal as ModalMui, BoxProps,
  Backdrop, Theme, styled,
} from '@mui/material';

import { SxProps } from '@mui/system';

// THIRD PARTY IMPORTS
import { IconX } from '@tabler/icons';

// PROJECT IMPORTS
import scroller from '@styles/scroller';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */
/* eslint-disable  @typescript-eslint/prefer-optional-chain */

// ===========================|| MODAL ||=========================== //
/* eslint-disable  @typescript-eslint/no-unused-vars */
export const LoadingContext = createContext({
  handleSetCanClose: (v: boolean): void => {},
});

interface ModalProps {
  isOpen: boolean
  title?: string | JSX.Element
  onClose: () => void
  children: ReactElement
  canClose?: boolean
  Icon?: FC
  sx?: SxProps<Theme>
  contentSx?: SxProps<Theme>
}

const Modal: FC<ModalProps> = ({ Icon, ...props }): JSX.Element => {
  const [canClose, setCanClose] = useState(Object.is(props.canClose, false) ? props.canClose as boolean : true);

  const canCloseContext = ({
    handleSetCanClose: (v: boolean): void => {
      setCanClose(v);
    },
  });

  return (
    <LoadingContext.Provider value={canCloseContext}>
      <ModalMui
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '.MuiBackdrop-root': { pointerEvents: canClose ? 'all' : 'none' },
          ...props.sx,
        }}
        open={props.isOpen}
        onClose={props.onClose}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        closeAfterTransition
      >
        {
            props.isOpen
              ? (
                <ModalContent borderRadius={1} zIndex={1}>
                  {
                    props.canClose &&
                      <ModalClose onClick={() => props.onClose()}>
                        <IconX stroke={1} />
                      </ModalClose>
                  }
                  <ModalScroller>
                    {props.children}
                  </ModalScroller>
                </ModalContent>
              )
              : <></>
        }
      </ModalMui>
    </LoadingContext.Provider>
  );
};

const ModalContent = styled(Box)<BoxProps>(({ theme }) => ({
  maxHeight: 'calc(100% - 1rem)',
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    borderRadius: '0 !important',
  },
}));

const ModalScroller = styled(Box)<BoxProps>(({ theme }) => ({
  overflowX: 'hidden',
  overflowY: 'scroll',
  width: '100%',
  height: '100%',
  maxHeight: 'calc(100vh - 1rem)',
  [theme.breakpoints.up('sm')]: {
    ...scroller(theme),
    margin: '0 !important',
  },
}));

export const ModalClose = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: '1rem',
  right: '1rem',
  width: '2.3rem !important',
  height: '2.3rem !important',
  borderRadius: '50%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  cursor: 'pointer',
  '& svg': {
    width: '1.2rem !important',
    height: '1.2rem !important',
    color: '#fff',
    fill: '#fff',
  },
  [theme.breakpoints.down('sm')]: {
    top: '0.9rem',
    right: '1.5rem',
    width: '2rem!important',
    height: '2rem!important',
  },
}));

export default Modal;
