// REACT IMPORTS
import React, { FC } from 'react'

// THIRD PARTY IMPORTS
import { IconUpload } from '@tabler/icons'

// MUI IMPORTS
import { FormControl, Typography } from '@mui/material'

// PROJECT IMPORTS
import {
  InputFileButton, InputFileElement, InputFileIcon,
  InputFileLabel, InputFileLabelText
} from '@components/Inputs'
import { Translation } from '@src/i18n'
import Poster from '@components/Poster'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| INPUT - FILE ||=========================== //

export interface ImagePickerProps {
  id: string
  name: string
  title: string | JSX.Element
  preview: string
  error: boolean
  accept: string
  helpText: string | JSX.Element
  isImageFullWidth?: boolean
  handleChange: (e: any) => void
}

const ImagePicker: FC<ImagePickerProps> = (props): JSX.Element => {
  const handleButtonClick = (e: any): void => {
    e.target.parentElement.click()
  }

  return (
    <FormControl error={props.error} variant='standard' sx={{ width: 1 }}>
      <InputFileLabel htmlFor={props.id} filled={!!props.preview} isFull={!!props.isImageFullWidth}>
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
            props.preview
              ? (
                <>
                  <Poster image={props.preview} name={`${props.id}_image`} />
                </>
                )
              : (
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

export default ImagePicker
