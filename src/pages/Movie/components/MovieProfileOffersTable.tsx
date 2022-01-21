// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  styled, Table, TableHead, TableCell,
  TableBody, TableRow, TableProps, Paper, TableContainer
} from '@mui/material'

// PROJECT IMPORTS
import { String } from '@src/utils'
import { Translation } from '@src/i18n'

// ===========================|| MOVIE - PROFILE - OFFERS - TABLE ||=========================== //

export interface OffersTableRow {
  buyer: string
  price: string
  fiatPrice: string
  date: string
  expiration: string
}

export interface MovieProfileOffersTableProps {
  rows: OffersTableRow[]
}

const MovieProfileOffersTable: FC<MovieProfileOffersTableProps> = ({ rows }): JSX.Element => {
  return (
    <TableContainer component={Paper}>
      <MovieProfileOffersTableWrapper size='small' aria-label='purchases'>
        <TableHead>
          <TableRow>
            <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_FROM' /></TableCell>
            <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_PRICE' /></TableCell>
            <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_USD_PRICE' /></TableCell>
            <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_DATE' /></TableCell>
            <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_EXPIRATION' /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return <MovieProfileOffersTableRow {...row} key={index} />
          })}
        </TableBody>
      </MovieProfileOffersTableWrapper>
    </TableContainer>
  )
}

const MovieProfileOffersTableRow: FC<OffersTableRow> = (props): JSX.Element => {
  return (
    <TableRow>
      <TableCell sx={{ opacity: 0.8 }}>
        {String.minifyHash(props.buyer)}
      </TableCell>
      <TableCell sx={{ fontWeight: 600 }}>
        {props.price} ETH
      </TableCell>
      <TableCell sx={{ opacity: 0.8 }}>
        $ {props.fiatPrice}
      </TableCell>
      <TableCell sx={{ opacity: 0.8 }}>
        {props.date}
      </TableCell>
      <TableCell sx={{ opacity: 0.8 }}>
        {props.expiration}
      </TableCell>
    </TableRow>
  )
}

export default MovieProfileOffersTable

const MovieProfileOffersTableWrapper = styled(Table)<TableProps>(({ theme }) => ({
  'th,td': {
    color: theme.palette.primary.main,
    fontSize: '0.85rem',
    whiteSpace: 'nowrap'
  },
  th: {
    borderColor: `${theme.palette.divider} !important`,
    fontWeight: 600
  }
}))
