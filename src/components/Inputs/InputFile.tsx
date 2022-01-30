// REACT IMPORTS
import React, { FC } from 'react'

// THIRD PARTY IMPORTS
import { IconUpload } from '@tabler/icons'

// MUI IMPORTS
import {
  Box, Button, FormControl, InputLabel, styled, ButtonProps,
  InputLabelProps, Typography, BoxProps, TypographyProps
} from '@mui/material'

// PROJECT IMPORTS
import { Translation } from '@src/i18n'
import Poster from '@components/Poster'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| INPUT - FILE ||=========================== //

export interface InputFileProps {
  id: string
  name: string
  title: string | JSX.Element
  image: string
  error: boolean
  accept: string
  helpText: string | JSX.Element
  isImageFullWidth?: boolean
  handleChange: (e: any) => void
}

export const InputFile: FC<InputFileProps> = (props): JSX.Element => {
  const handleButtonClick = (e: any): void => {
    e.target.parentElement.click()
  }

  return (
    <FormControl error={props.error} variant='standard' sx={{ width: 1 }}>
      <InputFileLabel htmlFor={props.id} filled={!!props.image} isFull={!!props.isImageFullWidth}>
        <InputFileLabelText variant='h5' color='text.primary' fontWeight={600}>
          {props.title}
        </InputFileLabelText>
        <InputFileElement
          id={props.id}
          name={props.name}
          aria-describedby={props.id}
          onChange={props.handleChange}
          type='file' accept={props.accept}
        />
        {
          props.image ? (
            <>
              <Poster image={props.image} name={`${props.id}_image`} />
            </>
          ) : (
            <>
              <InputFileIcon>
                <IconUpload stroke={1} />
              </InputFileIcon>
              <Typography variant='h5' color='text.secondary' width={1} textAlign='center'>
                {props.helpText}
              </Typography>
              <InputFileButton variant='contained' color='primary' onClick={handleButtonClick}>
                <Translation target='MOVIE_CREATE_FILE_BUTTON' />
              </InputFileButton>
            </>
          )
        }
      </InputFileLabel>
    </FormControl>
  )
}

const InputFileElement = styled('input')({
  display: 'none'
})

export const InputFileIcon = styled(Box)<BoxProps>(({ theme }) => ({
  svg: {
    color: theme.palette.text.secondary,
    width: '2rem',
    height: '2rem'
  }
}))

const InputFileLabelText = styled(Typography)<TypographyProps>(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: '-2rem'
}))

const InputFileLabel = styled(InputLabel, {
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

const InputFileButton = styled(Button)<ButtonProps>(() => ({
  marginBottom: '-1.5rem',
  transform: 'translateY(2rem)',
  width: '14rem',
  height: '3rem',
  borderRadius: '12px !important',
  boxShadow: '0 5px 9px rgb(0 0 0 / 20%)',
  fontWeight: 600
}))
