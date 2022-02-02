// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  AccordionDetails,
  AccordionSummary, Divider,
  Grid, Typography
} from '@mui/material'

// PROJECT IMPORTS
import { Translation } from '@src/i18n'
import { IconChevronDown, IconListDetails } from '@tabler/icons'
import MovieProfileAccordion from '@pages/Movie/components/MovieProfileAccordion'
import { Movie } from '@state/movies/types'

// ===========================|| MOVIE - PROFILE - OFFERS - VIEW ||=========================== //

interface MovieProfileDetailRowProps {
  title: string
  value: string | JSX.Element
}

export const MovieProfileDetails: FC<Movie> = (props): JSX.Element => {
  return (
    <Grid item xs={12}>
      <MovieProfileAccordion defaultExpanded>
        <AccordionSummary expandIcon={<IconChevronDown stroke={1.5} />}>
          <Grid container spacing={2}>
            <Grid item alignItems='center' display='flex'>
              <IconListDetails stroke={1} />
            </Grid>
            <Grid item alignItems='center' display='flex'>
              <Typography>
                <Translation target='MOVIE_PROFILE_ADDITIONAL_DETAILS' />
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Divider />
          <Grid container spacing={1} sx={{ p: 2 }}>
            <MovieProfileDetailRow title='Genres' value={props.genres.toString()} />
            <MovieProfileDetailRow title='IMDB' value={props.imdb_code.toUpperCase()} />
            <MovieProfileDetailRow title='Lang' value={props.language.toUpperCase()} />
            <MovieProfileDetailRow title='Rating' value={props.rating.toFixed(2)} />
            <MovieProfileDetailRow title='Runtime' value={`${props.runtime.toString()} minutes`} />
            <MovieProfileDetailRow title='Year' value={props.year.toString()} />
          </Grid>
        </AccordionDetails>
      </MovieProfileAccordion>
    </Grid>
  )
}

const MovieProfileDetailRow: FC<MovieProfileDetailRowProps> = (props): JSX.Element => {
  return (
    <Grid item xs={12} display='flex' flexWrap='wrap' alignItems='center' justifyContent='space-between'>
      <Typography variant='body1' color='primary'>
        {props.title}
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        {props.value}
      </Typography>
    </Grid>
  )
}

export default MovieProfileDetails
