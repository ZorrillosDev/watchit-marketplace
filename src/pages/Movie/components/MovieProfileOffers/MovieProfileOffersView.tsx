// REACT IMPORTS
import React, { FC } from 'react';

// MUI IMPORTS
import {
  AccordionDetails,
  AccordionSummary, Divider,
  Grid, Typography,
} from '@mui/material';

// PROJECT IMPORTS
import { Translation } from '@src/i18n';
import { IconChevronDown, IconList } from '@tabler/icons';
import MovieProfileAccordion from '@pages/Movie/components/MovieProfileAccordion';
import MovieProfileOffersTable, { MovieProfileOffersTableProps } from '@pages/Movie/components/MovieProfileOffersTable';

// ===========================|| MOVIE - PROFILE - OFFERS - VIEW ||=========================== //

export const MovieProfileOffersView: FC<MovieProfileOffersTableProps> = (props): JSX.Element => {
  return (
    <Grid item xs={12}>
      <MovieProfileAccordion defaultExpanded>
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
          <MovieProfileOffersTable {...props} />
        </AccordionDetails>
      </MovieProfileAccordion>
    </Grid>
  );
};
