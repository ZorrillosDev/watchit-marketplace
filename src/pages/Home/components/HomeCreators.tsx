// REACT IMPORTS
import React, {FC, useEffect} from 'react'

// MUI IMPORTS
import {
    Grid,
    Typography,
    Container,
    styled,
    Chip,
    ChipProps,
    Avatar,
    AvatarProps,
    Box
} from '@mui/material'

// PROJECT IMPORTS
// TODO delete this when data comes from backend
import { FAKE_CREATORS } from '@src/config'
import TruncatedTypography from '@components/TruncatedTypography'
import {fetchUsers, UsersActions} from "@state/users/actions";
import {connect, RootStateOrAny} from "react-redux";
import {MoviesState} from "@state/movies/reducer";
import {Userstate} from "@state/users/reducer";
import {User} from "@state/types/user";
import {PixelArtIdenticon} from "@components/Identicon";

// ===========================|| HOME - CREATORS ||=========================== //

const HomeCreators: FC<Userstate & UsersActions> = ({collection, fetchUsers}): JSX.Element => {

    useEffect(() => {
        fetchUsers()
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
                            collection !== undefined ? collection.map((user: User, i: number) => {
                                return (
                                    <Grid item xs={6} sm={3} md={2} lg={4} key={i}>
                                        <HomeCreatorChip
                                            icon={<PixelArtIdenticon seed={user.address}/>}
                                            label={(
                                                <Box display='flex' flexDirection='column' paddingRight={1}>
                                                    <TruncatedTypography gutterBottom variant='body1' lines={1}>
                                                        {user.address}
                                                    </TruncatedTypography>
                                                    <TruncatedTypography gutterBottom variant='body1' sx={{ opacity: 0.5 }} lines={1}>
                                                        Minted movies: {user.movies ?? 0}
                                                    </TruncatedTypography>
                                                </Box>
                                            )}
                                            variant='outlined'
                                            aria-haspopup='true'
                                            color='primary'
                                        />
                                    </Grid>

                                )
                            }) : <></>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapDispatchToProps: Partial<UsersActions> = {fetchUsers}
const mapStateToProps = (state: RootStateOrAny): Userstate => {
    return {
        collection: state.users.collection
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeCreators)

const HomeCreatorChip = styled(Chip)<ChipProps>(({theme}) => ({
    height: '48px',
    width: '100%',
    alignItems: 'center',
    borderRadius: '3rem',
    border: 'none',
    transition: 'all .2s ease-in-out',
    display: 'flex',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    '.MuiChip-label, p': {
        margin: 0
    }
}))

const HomeCreatorAvatar = styled(Avatar)<AvatarProps>(() => ({
    cursor: 'pointer',
    width: '34px',
    height: '34px',
    fontSize: '1.2rem',
    margin: '8px 0 8px 8px !important'
}))
