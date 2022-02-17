// MUI IMPORTS
import {
  Box, Button, InputLabel, styled, ButtonProps,
  InputLabelProps, Typography, BoxProps, TypographyProps
} from '@mui/material'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| INPUT - FILE ||=========================== //

export const InputFileElement = styled('input')({
  display: 'none'
})

export const InputFileIcon = styled(Box)<BoxProps>(({ theme }) => ({
  svg: {
    color: theme.palette.text.secondary,
    width: '2rem',
    height: '2rem'
  }
}))

export const InputFileLabelText = styled(Typography)<TypographyProps>(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: '-2rem'
}))

export const InputFileLabel = styled(InputLabel, {
  shouldForwardProp: (prop) => prop !== 'isFull'
})<InputLabelProps & { filled: boolean, isFull: boolean }>(({ theme, filled, isFull }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  minHeight: '150px',
  width: '100%',
  padding: filled ? '16px' : '32px 60px',
  position: 'relative',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'visible',
  marginBottom: '1.5rem',
  marginTop: '1.5rem',
  cursor: 'pointer',
  '&:hover': {
    'h5, svg': {
      color: theme.palette.text.primary
    },
    borderColor: theme.palette.text.primary
  },
  '&.Mui-error': {
    'h5, svg': {
      color: theme.palette.error.main
    },
    borderColor: theme.palette.error.main
  },
  '& > .MuiPaper-root': {
    maxWidth: isFull ? '100%' : '16rem'
  }
}))

export const InputFileButton = styled(Button)<ButtonProps>(() => ({
  marginBottom: '-1.5rem',
  transform: 'translateY(2rem)',
  width: '14rem',
  height: '3rem',
  borderRadius: '12px !important',
  boxShadow: '0 5px 9px rgb(0 0 0 / 20%)',
  fontWeight: 600
}))
