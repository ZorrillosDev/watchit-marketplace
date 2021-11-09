// REACT IMPORTS
import React, {FC, useEffect} from 'react'
import {connect, RootStateOrAny} from "react-redux";

// MUI IMPORTS
import {Grid, Typography, Container, Button, useMediaQuery} from '@mui/material'

// PROJECT IMPORTS
// TODO delete this when data comes from backend
import {FAKE_MOVIES} from '@src/config'
import {FilterList} from '@mui/icons-material'
import {useTheme} from '@mui/material/styles'
import {Theme} from '@mui/system'
import HomeRecentPoster from '@pages/Home/components/HomeRecentPoster'
import {MOVIES_COLUMNS, MOVIES_ROWS} from '@pages/Home/CONSTANTS'
import {RecentMoviesActions, fetchRecentMovies} from "@state/recents/actions";
import {RecentMoviesState} from "@state/recents/reducer";
import {Movie} from "@state/types";

// ===========================|| HOME - RECENT ||=========================== //

const HomeRecent: FC<RecentMoviesState & RecentMoviesActions> = ({recent, fetchRecentMovies}): JSX.Element => {

    const theme: Theme = useTheme()
    let moviesColumns = MOVIES_COLUMNS
    moviesColumns = useMediaQuery(theme.breakpoints.up('md')) ? 3 : moviesColumns
    moviesColumns = useMediaQuery(theme.breakpoints.up('lg')) ? 4 : moviesColumns
    moviesColumns = useMediaQuery(theme.breakpoints.up('xl')) ? 5 : moviesColumns

    useEffect(() => {
        fetchRecentMovies()
    }, [])


    return (
        <Container>
            <Grid container alignItems='center' justifyContent='center' spacing={6}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant='h2' color='text.primary' fontWeight={600}>
                                Recent Movies
                            </Typography>
                        </Grid>
                        <Grid item xs={6} display='flex' alignItems='center' justifyContent='flex-end'>
                            <Button variant='outlined' color='primary' startIcon={<FilterList/>}
                                    sx={{borderRadius: '3rem !important'}}>
                                Filter
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} display='flex' alignItems='center' justifyContent='center'>
                    <Grid container spacing={3}>
                        {
                            recent?.length && recent.map((movie: Movie, i: number) => {
                                const moviesMax = moviesColumns * MOVIES_ROWS
                                return (i < moviesMax)
                                    ? <HomeRecentPoster {...movie} key={i}/>
                                    : <React.Fragment key={i}/>
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}


const mapDispatchToProps: Partial<RecentMoviesActions> = {fetchRecentMovies}
const mapStateToProps = (state: RootStateOrAny): RecentMoviesState => {
    return {
        recent: state.recent.recent
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeRecent)

