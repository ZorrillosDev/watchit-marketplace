// REACT IMPORTS
import React, {FC} from 'react'

// MUI IMPORTS
import {
    styled, Table, TableHead, TableCell,
    TableBody, TableRow, TableProps, Paper, TableContainer, Box, Typography
} from '@mui/material'

// PROJECT IMPORTS
import {String} from '@src/utils'
import {Bolt} from '@components/Icons'
import {Translation} from '@src/i18n'
import {Movie, MovieBid} from '@state/movies/types'
import {useEthers} from '@usedapp/core'
import {useNFTHolderOf} from '@hooks/useNFTContract'
import {BLACK_HOLE} from '@w3/CONSTANTS'
import AcceptOffer from '@pages/Movie/components/MovieProfileAcceptOffer'

// ===========================|| MOVIE - PROFILE - OFFERS - TABLE ||=========================== //

export interface MovieProfileOffersTableProps {
    rows: MovieBid[]
    movie: Movie
}

const MovieProfileOffersTable: FC<MovieProfileOffersTableProps> = ({rows, ...props}): JSX.Element => {
    return (
        <TableContainer component={Paper}>
            {
                (rows.length > 0)
                    ? (
                        <MovieProfileOffersTableWrapper size='small' aria-label='purchases'>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_FROM'/></TableCell>
                                    <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_PRICE'/></TableCell>
                                    <TableCell><Translation target='MOVIE_PROFILE_OFFERS_TABLE_DATE'/></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => {
                                    return <MovieProfileOffersTableRow {...row} key={index}/>
                                })}
                            </TableBody>
                        </MovieProfileOffersTableWrapper>
                    )
                    : (
                        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' sx={{p: 4}}>
                            <Bolt sx={{pb: 2, fontSize: '3.3rem'}}/>
                            <Typography>
                                <Translation
                                    target={'MOVIE_PROFILE_OFFERS_TABLE_EMPTY'}/>
                            </Typography>
                        </Box>
                    )
            }
        </TableContainer>
    )
}

const MovieProfileOffersTableRow: FC<MovieBid> = (props): JSX.Element => {
    return (
        <TableRow>
            <TableCell sx={{opacity: 0.8}}>
                {String.minifyHash(props.account)}
            </TableCell>
            <TableCell sx={{fontWeight: 600}}>
                {props.bid} ETH
            </TableCell>
            <TableCell sx={{opacity: 0.8}}>
                {props.created_at}
            </TableCell>
        </TableRow>
    )
}

export default MovieProfileOffersTable

const MovieProfileOffersTableWrapper = styled(Table)<TableProps>(({theme}) => ({
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
