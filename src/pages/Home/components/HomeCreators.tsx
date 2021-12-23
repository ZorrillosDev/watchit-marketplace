// REACT IMPORTS
import React, {FC, useEffect} from 'react'

// MUI IMPORTS
import {
    Grid,
    Typography,
    Container,
} from '@mui/material'

// PROJECT IMPORTS
// TODO delete this when data comes from backend
import {fetchCreators} from '@state/users/actions'
import {connect, RootStateOrAny} from 'react-redux'
import {selectCreations} from "@state/users/selector";
import {User, UserState, UsersActions} from '@state/users/types'
import {HomeCreatorsItems} from "@pages/Home/components/HomeCreatorsItems";

// ===========================|| HOME - CREATORS ||=========================== //

const HomeCreators: FC<UserState & UsersActions> = ({creations, fetchCreators}): JSX.Element => {
    useEffect(() => {
        fetchCreators()
    }, [])

    return (
        <Container>
            <Grid spacing={6} container alignItems='center' justifyContent='center'>
                <Grid item xs={12}>
                    <Typography variant='h2' color='text.primary' fontWeight={600}>
                        Creators
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3} display='flex' flexWrap='wrap' justifyContent='space-between'>
                        {
                            creations !== undefined ? creations.map((user: User, i: number) => {
                                return <HomeCreatorsItems user={user} key={i}/>
                            }) : <></>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapDispatchToProps: Partial<UsersActions> = {fetchCreators}
const mapStateToProps = (state: RootStateOrAny): UserState => {
    const creations = selectCreations(state)
    return {creations}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeCreators)

