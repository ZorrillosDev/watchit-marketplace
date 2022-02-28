// REACT IMPORTS
import React, {FC, useEffect} from 'react'

// PROJECT IMPORTS
import {MovieProfileOffersView} from '@pages/Movie/components/MovieProfileOffers/MovieProfileOffersView'
import {MovieArgs, MoviesActions, MoviesState} from '@state/movies/types'
import {connect, RootStateOrAny} from 'react-redux'
import {fetchRecentMovieBids} from '@state/movies/actions'
import {selectBidCollection} from '@state/movies/selector'
import {useParams} from "react-router";

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

// ===========================|| MOVIE - PROFILE - OFFERS - CONTAINER ||=========================== //

type MovieProfileOffersProps = MoviesActions & MoviesState
const MovieProfileOffersContainer: FC<MovieProfileOffersProps> = (props): JSX.Element => {
    const {id} = useParams<MovieArgs>()
    const {
        fetchRecentMovieBids,
        bidCollection
    } = props


    useEffect(() => {
        fetchRecentMovieBids({id})
    }, [bidCollection.length])

    return <MovieProfileOffersView rows={bidCollection}/>
}

const mapDispatchToProps: Partial<MoviesActions> = {fetchRecentMovieBids}
const mapStateToProps = (state: RootStateOrAny): Partial<MoviesState> => {
    const bidCollection = selectBidCollection(state)
    return {bidCollection}
}

export const MovieProfileOffers = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieProfileOffersContainer)
