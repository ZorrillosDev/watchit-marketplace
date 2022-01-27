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

// ===========================|| MOVIE - CREATE - FORM - FILE ||=========================== //

export interface MovieCreateFormFileProps {
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

const MovieCreateFormFile: FC<MovieCreateFormFileProps> = (props): JSX.Element => {
  const handleButtonClick = (e: any): void => {
    e.target.parentElement.click()
  }

  return (
    <FormControl error={props.error} variant='standard' sx={{ width: 1 }}>
      <MovieCreateFileLabel htmlFor={props.id} filled={!!props.image} isFull={!!props.isImageFullWidth}>
        <MovieCreateFileLabelText variant='h5' color='text.primary' fontWeight={600}>
          {props.title}
        </MovieCreateFileLabelText>
        <MovieCreateFileInput
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
              <MovieCreateFileIcon>
                <IconUpload stroke={1} />
              </MovieCreateFileIcon>
              <Typography variant='h5' color='text.secondary' width={1} textAlign='center'>
                {props.helpText}
              </Typography>
              <MovieCreateFileButton variant='contained' color='primary' onClick={handleButtonClick}>
                <Translation target='MOVIE_CREATE_FILE_BUTTON' />
              </MovieCreateFileButton>
            </>
          )
        }
      </MovieCreateFileLabel>
    </FormControl>
  )
}

const MovieCreateFileInput = styled('input')({
  display: 'none'
})

export const MovieCreateFileIcon = styled(Box)<BoxProps>(({ theme }) => ({
  svg: {
    color: theme.palette.text.secondary,
    width: '2rem',
    height: '2rem'
  }
}))

const MovieCreateFileLabelText = styled(Typography)<TypographyProps>(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: '-2rem'
}))

const MovieCreateFileLabel = styled(InputLabel, {
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

const MovieCreateFileButton = styled(Button)<ButtonProps>(() => ({
  marginBottom: '-1.5rem',
  transform: 'translateY(2rem)',
  width: '14rem',
  height: '3rem',
  borderRadius: '12px !important',
  boxShadow: '0 5px 9px rgb(0 0 0 / 20%)',
  fontWeight: 600
}))

export default MovieCreateFormFile
