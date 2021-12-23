// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  Accordion, AccordionDetails, AccordionProps,
  AccordionSummary, Button, Container, Divider,
  Grid, styled, Typography, TypographyProps, Tab, TabProps
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

// THIRD PARTY IMPORTS
import {
  IconMovie,
  IconPlayerPlay,
  IconEye,
  IconExternalLink,
  IconList,
  IconChevronDown
} from '@tabler/icons'

// PROJECT IMPORTS
import MovieProfileSection, { MovieProfileSectionWrapper } from '@pages/Movie/Profile/components/MovieProfileSection'
import MovieProfileActivityTable from '@pages/Movie/Profile/components/MovieProfileActivityTable'
import MovieProfileOffersTable from '@pages/Movie/Profile/components/MovieProfileOffersTable'
import MovieProfileHeader from '@pages/Movie/Profile/components/MovieProfileHeader'
import MovieProfileDetail from '@pages/Movie/Profile/components/MovieProfileDetail'
import MovieProfilePrice from '@pages/Movie/Profile/components/MovieProfilePrice'
import MovieProfileUser from '@pages/Movie/Profile/components/MovieProfileUser'
import Poster, { PosterFooterProps, PosterMediaProps } from '@components/Poster'
import TruncatedTypography from '@components/TruncatedTypography'
import { User } from '@state/users/types'
import Footer from '@components/Footer'
import { Translation } from '@src/i18n'

// ===========================|| MOVIE - PROFILE - VIEW ||=========================== //

type PosterProps = PosterMediaProps & PosterFooterProps

export interface MovieProfileViewProps extends PosterProps {
  creator: User
  owner: User
  description: string
}

export const MovieProfileView: FC<MovieProfileViewProps> = (props): JSX.Element => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
    setValue(newValue)
  }

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
                    <Poster {...props} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h2' color='primary'>{props.name}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TruncatedTypography variant='h4' color='primary' fontWeight={400} lines={5} sx={{ m: 0 }}>
                      {props.description}
                    </TruncatedTypography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Grid container spacing={3}>
                  <MovieProfileHeader sx={{ display: { xs: 'none', md: 'flex' } }} />
                  <MovieProfilePrice {...props} />
                  <Grid item xs={12} sx={{ pt: '3rem !important' }}>
                    <MovieProfileSectionWrapper>
                      <MovieProfileUser {...props.creator} />
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
                  <Grid item xs={12}>
                    <MovieProfileOffersAccordion defaultExpanded>
                      <AccordionSummary expandIcon={<IconChevronDown stroke={1.5} />}>
                        <Grid container spacing={2}>
                          <Grid item display='flex' alignItems='center'>
                            <IconList stroke={1} />
                          </Grid>
                          <Grid item display='flex' alignItems='center'>
                            <Typography><Translation target='MOVIE_PROFILE_OFFERS' /></Typography>
                          </Grid>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 0 }}>
                        <Divider />
                        <MovieProfileOffersTable />
                      </AccordionDetails>
                    </MovieProfileOffersAccordion>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mb: 6 }}>
            <TabContext value={value}>
              <TabList onChange={handleChange} centered>
                <MovieProfileTab label={<Translation target='MOVIE_PROFILE_MARKET_ACTIVITY' />} value='1' />
                <MovieProfileTab label={<Translation target='MOVIE_PROFILE_ADDITIONAL_DETAILS' />} value='2' />
              </TabList>
              <TabPanel value='1' sx={{ px: 0 }}>
                <MovieProfileActivityTable />
              </TabPanel>
              <TabPanel value='2' sx={{ px: 0 }}>
                <Grid container spacing={2}>
                  <MovieProfileDetail text='3840 x 2160 px (4K)' />
                  <MovieProfileDetail
                    text={<Translation target='MOVIE_PROFILE_ADDITIONAL_DETAIL_1' />}
                    link={{ href: '#', text: <Translation target='MOVIE_PROFILE_ADDITIONAL_DETAIL_1_LINK' /> }}
                  />
                  <MovieProfileDetail
                    text={<Translation target='MOVIE_PROFILE_ADDITIONAL_DETAIL_2' />}
                    link={{ href: '#', text: <Translation target='MOVIE_PROFILE_ADDITIONAL_DETAIL_2_LINK' /> }}
                  />
                  <MovieProfileDetail
                    text={<Translation target='MOVIE_PROFILE_ADDITIONAL_DETAIL_3' />}
                    link={{ href: '#', text: <Translation target='MOVIE_PROFILE_ADDITIONAL_DETAIL_3_LINK' /> }}
                  />
                  <MovieProfileDetail text={<Translation target='MOVIE_PROFILE_ADDITIONAL_DETAIL_4' />} />
                  <MovieProfileDetail text={<Translation target='MOVIE_PROFILE_ADDITIONAL_DETAIL_5' />} />
                </Grid>
              </TabPanel>
            </TabContext>
          </Grid>
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

const MovieProfileOffersAccordion = styled(Accordion)<AccordionProps>(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  '*': {
    color: theme.palette.primary.main
  },
  '.MuiAccordionSummary-content': {
    margin: '12px 0 !important'
  },
  '.MuiAccordionSummary-root': {
    minHeight: 'auto !important'
  }
}))

const MovieProfileTab = styled(Tab)<TabProps>(({ theme }) => ({
  fontWeight: 400,
  color: 'text.secondary',
  fontSize: '1rem',
  '&.Mui-selected': {
    fontWeight: 600
  }
}))
