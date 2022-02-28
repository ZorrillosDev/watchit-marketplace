// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  styled, Table, TableHead,
  TableCell, TableBody, TableRow, TableProps, TableContainer, Paper
} from '@mui/material'

// PROJECT IMPORTS
import MovieProfileUser from '@pages/Movie/components/MovieProfileUser'
import { Translation } from '@src/i18n'

// ===========================|| MOVIE - PROFILE - ACTIVITY - TABLE ||=========================== //

export interface ActivityTableRow {
  date: string
  owner: string
  edition: string | number
  description: string
}

export interface MovieProfileActivityTableProps {
  rows?: ActivityTableRow[]
}

const MovieProfileActivityTable: FC<MovieProfileActivityTableProps> = ({ rows }): JSX.Element => {
  return (
    <TableContainer component={Paper}>
      <MovieProfileActivityTableWrapper size='small'>
        <TableHead>
          <TableRow>
            <TableCell><Translation target='MOVIE_PROFILE_ACTIVITY_DATE' /></TableCell>
            <TableCell><Translation target='MOVIE_PROFILE_OWNER' /></TableCell>
            <TableCell><Translation target='MOVIE_PROFILE_ACTIVITY_EDITION' /></TableCell>
            <TableCell><Translation target='MOVIE_PROFILE_ACTIVITY_DETAILS' /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows !== undefined
            ? rows.map((row, index) => {
              return <MovieProfileActivityTableRow {...row} key={index} />
            })
            : <></>}
        </TableBody>
      </MovieProfileActivityTableWrapper>
    </TableContainer>
  )
}

const MovieProfileActivityTableRow: FC<ActivityTableRow> = (props): JSX.Element => {
  return (
    <TableRow>
      <TableCell sx={{ opacity: 0.8 }}>
        {props.date}
      </TableCell>
      <TableCell sx={{ opacity: 0.8 }}>
        <MovieProfileUser address={props.owner} />
      </TableCell>
      <TableCell sx={{ opacity: 0.8 }}>
        # {props.edition}
      </TableCell>
      <TableCell sx={{ opacity: 0.8 }}>
        {props.description}
        {/* Acquired for 4.1 ETH <Typography variant='body1' sx={{ display: 'inline' }}>($ 6,940.54)</Typography> */}
      </TableCell>
    </TableRow>
  )
}

export default MovieProfileActivityTable

const MovieProfileActivityTableWrapper = styled(Table)<TableProps>(({ theme }) => ({
  th: {
    fontWeight: 600
  },
  'th, td': {
    borderColor: `${theme.palette.divider} !important`,
    fontSize: '0.9rem',
    whiteSpace: 'nowrap'
  }
}))
