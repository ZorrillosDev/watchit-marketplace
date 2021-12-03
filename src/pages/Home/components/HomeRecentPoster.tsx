// REACT IMPORTS
import React, {FC} from 'react'
import {Link} from 'react-router-dom'

// MUI IMPORTS
import {Grid, styled, GridProps} from '@mui/material'

// PROJECT IMPORTS
import {
    PosterWrapper,
    PosterHeader,
    PosterFooter,
    PosterMedia
} from '@components/Poster'
import {Movie} from '@state/types/movies'

// ===========================|| HOME - RECENT - POSTER ||=========================== //

const HomeRecentPoster: FC<Movie> = (props): JSX.Element => {
    const {
        creator,
        image,
        path,
        name,
        properties
    } = props

    return (
        <HomeRecentPosterWrapper item>
            <Link to={path}>
                <PosterWrapper>
                    <PosterHeader creator={creator}/>
                    <PosterMedia image={image} name={name}/>
                    <PosterFooter price={properties.price} name={name}/>
                </PosterWrapper>
            </Link>
        </HomeRecentPosterWrapper>

    )
}

export default HomeRecentPoster

export const HomeRecentPosterWrapper = styled(Grid)<GridProps>(({theme}) => ({
    width: '100%',
    height: '25rem',
    [theme.breakpoints.up('xs')]: {
        maxWidth: '100%'
    },
    [theme.breakpoints.up('sm')]: {
        maxWidth: 'calc(100% / 2)'
    },
    [theme.breakpoints.up('md')]: {
        maxWidth: 'calc(100% / 3)'
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: 'calc(100% / 4)'
    },
    [theme.breakpoints.up('xl')]: {
        maxWidth: 'calc(100% / 5)'
    }
}))
