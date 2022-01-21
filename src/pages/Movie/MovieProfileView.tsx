// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  Button, Container, Grid, styled, Typography, TypographyProps
} from '@mui/material'

// THIRD PARTY IMPORTS
import {
  IconMovie,
  IconPlayerPlay,
  IconEye,
  IconExternalLink
} from '@tabler/icons'

// PROJECT IMPORTS
import MovieProfileSection, { MovieProfileSectionWrapper } from '@pages/Movie/components/MovieProfileSection'
import MovieProfileTabsBottom from '@pages/Movie/components/MovieProfileTabsBottom'
import MovieProfileHeader from '@pages/Movie/components/MovieProfileHeader'
import MovieProfilePrice from '@pages/Movie/components/MovieProfilePrice'
import MovieProfileUser from '@pages/Movie/components/MovieProfileUser'
import MovieProfileOffers from '@pages/Movie/components/MovieProfileOffers'
import Poster from '@components/Poster'
import TruncatedTypography from '@components/TruncatedTypography'
import Footer from '@components/Footer'
import { Translation } from '@src/i18n'
import { Movie } from '@state/movies/types'
import MovieProfileDetail from '@pages/Movie/components/MovieProfileDetail'

// ===========================|| MOVIE - PROFILE - VIEW ||=========================== //

export const MovieProfileView: FC<Movie> = (props): JSX.Element => {
  return (
    <>
      <Container sx={{ maxWidth: '1100px !important', mt: 4 }}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
                <MovieProfileHeader />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Poster image={props.posters.large} name={props.title} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h2' color='primary'>{props.title}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Grid container spacing={3}>
                  <MovieProfileHeader sx={{ display: { xs: 'none', md: 'flex' } }} />
                  <MovieProfilePrice />
                  <Grid item xs={12} sx={{ pt: '3rem !important' }}>
                    <MovieProfileSectionWrapper>
                      <MovieProfileUser address={props.creator} />
                      <MovieProfileCreatorTypography variant='body1' color='primary'>
                        <Translation target='MOVIE_PROFILE_CREATOR' />
                      </MovieProfileCreatorTypography>
                    </MovieProfileSectionWrapper>
                  </Grid>
                  <Grid item xs={12}>
                    <MovieProfileSection
                      component={Button}
                      text={<Translation target='MOVIE_PROFILE_VIEW_WATCHIT' />}
                      iconEnd={<IconPlayerPlay stroke={1} />}
                      iconStart={<IconMovie stroke={1} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MovieProfileSection
                      component={Button}
                      text={<Translation target='MOVIE_PROFILE_VIEW_ETHERSCAN' />}
                      iconStart={<IconEye stroke={1} />}
                      iconEnd={<IconExternalLink stroke={1} />}
                    />
                  </Grid>
                  <MovieProfileOffers />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TruncatedTypography
              variant='h4' color='primary'
              fontWeight={400} lines={5}
              sx={{ m: 0 }}
            >
              {props.synopsis}
            </TruncatedTypography>
          </Grid>
          <MovieProfileTabsBottom>
            <Grid container spacing={2}>
              {/* Todo add details here, these are for example */}
              <MovieProfileDetail text={`Genres: ${props.genres.toString()}`} />
              <MovieProfileDetail text={`IMDB: ${props.imdb_code.toUpperCase()}`} />
              <MovieProfileDetail text={`Lang: ${props.language.toUpperCase()}`} />
              <MovieProfileDetail text={`Rating: ${props.rating.toFixed(2)}`} />
              <MovieProfileDetail text={`Runtime: ${props.runtime.toString()} minutes`} />
              <MovieProfileDetail text={`Year: ${props.year.toString()}`} />
            </Grid>
          </MovieProfileTabsBottom>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

const MovieProfileCreatorTypography = styled(Typography)<TypographyProps>(() => ({
  position: 'absolute',
  right: '1.4rem',
  top: '1.4rem',
  fontWeight: 500
}))
