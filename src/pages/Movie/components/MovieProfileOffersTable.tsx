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
import {Movie, MovieBid} from '@state/movies/types'
import {useEthers} from "@usedapp/core";
import {useNFTHolderOf} from "@hooks/useNFTContract";
import {BLACK_HOLE} from "@w3/CONSTANTS";
import AcceptOffer from "@pages/Movie/components/MovieProfileAcceptOffer";

// ===========================|| MOVIE - PROFILE - OFFERS - TABLE ||=========================== //

export interface MovieProfileOffersTableProps {
  rows: MovieBid[]
  movie: Movie
}

const MovieProfileOffersTable: FC<MovieProfileOffersTableProps> = ({ rows , ...props}): JSX.Element => {
  const { account } = useEthers()
  const holder = useNFTHolderOf(props.movie.token)
  const currentHolder = holder !== undefined && holder !== BLACK_HOLE ? holder : props.movie.creator
  const isOwner = !!account && Object.is(account, currentHolder)

  return (
    <TableContainer component={Paper}>
      <MovieProfileOffersTableWrapper size='small' aria-label='purchases'>
        <TableHead>
          <TableRow>
            <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_FROM' /></TableCell>
            <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_PRICE' /></TableCell>
            <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_DATE' /></TableCell>
            <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_ACTION' /></TableCell>
            { isOwner &&
              <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_ACTION' /></TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return <MovieProfileOffersTableRow {...row} key={index} isOwner={isOwner} />
          })}
          <MovieProfileOffersTableRow isOwner={true} bid={10} id='0XOO' account='0X001' created_at={'01/02/03'} />
          <MovieProfileOffersTableRow isOwner={true} bid={11} id='0XO1' account='0X002' created_at={'01/02/03'} />
          <MovieProfileOffersTableRow isOwner={true} bid={12} id='0XO2' account='0X003' created_at={'01/02/03'} />
          <MovieProfileOffersTableRow isOwner={true} bid={13} id='0XO3' account='0X004' created_at={'01/02/03'} />
        </TableBody>
      </MovieProfileOffersTableWrapper>
    </TableContainer>
  )
}

const MovieProfileOffersTableRow: FC<MovieBid & { isOwner : boolean }> = (props): JSX.Element => {
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
      { props.isOwner &&
        <TableCell>
          <AcceptOffer buttonSx={{padding: '6px 16px'}} price={props.bid} />
        </TableCell>
      }
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
