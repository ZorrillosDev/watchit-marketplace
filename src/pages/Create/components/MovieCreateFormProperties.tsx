// REACT IMPORTS
import React, { FC, useState } from 'react'

// MUI IMPORTS
import { TextField, Grid, styled, Typography, TextFieldProps } from '@mui/material'

// PROJECT IMPORTS
import { Translation } from '@src/i18n'
import { MOVIE_EXTRA_FIELDS_LIMIT } from '@src/config/movies'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */
/* eslint-disable  @typescript-eslint/consistent-type-assertions */
/* eslint-disable  @typescript-eslint/no-dynamic-delete */

// ===========================|| MOVIE - CREATE - FROM - PROPERTIES ||=========================== //

interface Property {
  key: string
  value: string
}

interface Properties {
  [key: string]: Property
}

const MovieCreateFormProperties: FC = (): JSX.Element => {
  const emptyProperty: Property = { key: '', value: '' }
  const [properties, setProperties] = useState({ p_0: emptyProperty } as Properties)

  const handleKeyChange = (e: any, index: number): void => {
    const p = properties[`p_${index}`]
    const obj: Properties = { [`p_${index}`]: { ...p, ...{ key: e.target.value } } }
    setProperties({ ...properties, ...obj })
  }

  const handleValueChange = (e: any, index: number): void => {
    const value = e.target.value
    const length = Object.keys(properties).length
    const isValueEmpty = Object.is(value.length, 0)
    const isLast = Object.is(length, index + 1)
    const last = properties[`p_${length - 1}`]
    const isLastEmpty = Object.is(last.key, '') && Object.is(last.value, '')
    const canAddNewItem = (length < MOVIE_EXTRA_FIELDS_LIMIT) && isLast && !isValueEmpty
    const p = properties[`p_${index}`]
    const obj: Properties = { [`p_${index}`]: { ...p, ...{ value: e.target.value } } }
    const newItem: Properties = { [`p_${index + 1}`]: emptyProperty }

    if (isLastEmpty && isValueEmpty) delete properties[`p_${length - 1}`]

    setProperties({ ...properties, ...obj, ...(canAddNewItem && newItem) })
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h5' color='text.primary' fontWeight={600} sx={{ mt: 2, mb: -2 }}>
          <Translation target='MOVIE_CREATE_PROPERTIES' />
        </Typography>
      </Grid>
      {
        Object.keys(properties).map((propertyKey, index) => {
          const isLast = Object.is(Object.keys(properties).length, index + 1)
          return (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <MovieCreateTextField
                  id={`movie_property_key_${index}`} variant='standard' name={`movie_property_key_${index}`}
                  value={properties[propertyKey].key} onChange={(e: any) => handleKeyChange(e, index)}
                  {...(isLast && { helperText: <Translation target='MOVIE_CREATE_KEY_HELP' /> })} label={<Translation target='MOVIE_CREATE_KEY' />}
                />
              </Grid>
              <Grid item xs={6}>
                <MovieCreateTextField
                  id={`movie_property_value_${index}`} variant='standard' name={`movie_property_value_${index}`}
                  value={properties[propertyKey].value} onChange={(e: any) => handleValueChange(e, index)}
                  {...(isLast && { helperText: <Translation target='MOVIE_CREATE_VALUE_HELP' /> })} label={<Translation target='MOVIE_CREATE_VALUE' />}
                />
              </Grid>
            </React.Fragment>
          )
        })
      }
    </>
  )
}

export const MovieCreateTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  width: '100%',
  'label, input, textarea': {
    color: theme.palette.text.primary,
    fontWeight: 600
  }
}))

export default MovieCreateFormProperties
