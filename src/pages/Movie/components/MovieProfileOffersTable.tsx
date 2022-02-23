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
import {MovieBid} from "@state/movies/types";

// ===========================|| MOVIE - PROFILE - OFFERS - TABLE ||=========================== //


export interface MovieProfileOffersTableProps {
  rows: MovieBid[]
}

const MovieProfileOffersTable: FC<MovieProfileOffersTableProps> = ({ rows }): JSX.Element => {
  return (
    <TableContainer component={Paper}>
      <MovieProfileOffersTableWrapper size='small' aria-label='purchases'>
        <TableHead>
          <TableRow>
            <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_FROM' /></TableCell>
            <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_PRICE' /></TableCell>
            <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_DATE' /></TableCell>
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

const MovieProfileOffersTableRow: FC<MovieBid> = (props): JSX.Element => {
  return (
    <TableRow>
      <TableCell sx={{ opacity: 0.8 }}>
        {String.minifyHash(props.account)}
      </TableCell>
      <TableCell sx={{ fontWeight: 600 }}>
        {props.bid} ETH
      </TableCell>
      <TableCell sx={{ opacity: 0.8 }}>
        {props.created_at}
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
