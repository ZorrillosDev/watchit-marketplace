// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  styled, Typography, Table, TableHead,
  TableCell, TableBody, TableRow, TableProps, TableContainer, Paper
} from '@mui/material'

// PROJECT IMPORTS
import MovieProfileUser from '@pages/Movie/Profile/components/MovieProfileUser'
import { Translation } from '@src/i18n'

// ===========================|| MOVIE - PROFILE - ACTIVITY - TABLE ||=========================== //

const MovieProfileActivityTable: FC = (): JSX.Element => {
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
          <TableRow>
            <TableCell sx={{ opacity: 0.8 }}>
              20/11/21
            </TableCell>
            <TableCell sx={{ opacity: 0.8 }}>
              <MovieProfileUser address='00x8372827830203' showMovies={false} />
            </TableCell>
            <TableCell sx={{ opacity: 0.8 }}>
              # 2
            </TableCell>
            <TableCell sx={{ opacity: 0.8 }}>
              Acquired for 4.1 ETH <Typography variant='body1' sx={{ display: 'inline' }}>($ 6,940.54)</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ opacity: 0.8 }}>
              20/11/21
            </TableCell>
            <TableCell sx={{ opacity: 0.8 }}>
              <MovieProfileUser address='00x83728278302325' showMovies={false} />
            </TableCell>
            <TableCell sx={{ opacity: 0.8 }}>
              # 1
            </TableCell>
            <TableCell sx={{ opacity: 0.8 }}>
              Created
            </TableCell>
          </TableRow>
        </TableBody>
      </MovieProfileActivityTableWrapper>
    </TableContainer>
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
