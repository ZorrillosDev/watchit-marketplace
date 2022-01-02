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

const MovieProfileOffersTable: FC = (): JSX.Element => {
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
          <TableRow>
            <TableCell sx={{ opacity: 0.8 }}>
              {String.minifyHash('0x09183874228273938382923839')}
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              6.8 ETH
            </TableCell>
            <TableCell sx={{ opacity: 0.8 }}>
              $ 9,622.22
            </TableCell>
            <TableCell sx={{ opacity: 0.8 }}>
              20/11/21 : 13 : 30
            </TableCell>
            <TableCell sx={{ opacity: 0.8 }}>
              72 Hours
            </TableCell>
          </TableRow>
        </TableBody>
      </MovieProfileOffersTableWrapper>
    </TableContainer>
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
