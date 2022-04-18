// REACT IMPORTS
import React, { FC } from 'react';

// MUI IMPORTS
import {
  Box, BoxProps,
  Grid, styled, Typography,
} from '@mui/material';

// ===========================|| MOVIE - PROFILE - SECTION ||=========================== //

export interface MovieProfileSectionProps {
  text: string | JSX.Element
  iconStart: JSX.Element
  iconEnd: JSX.Element
  component?: FC
}


export const MovieProfileSectionWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
  position: 'relative',
  color: theme.palette.primary.main,
}));


const MovieProfileSection: FC<MovieProfileSectionProps> = (props): JSX.Element => {
  return (
    <MovieProfileSectionWrapper component={props.component}>
      <Grid container spacing={2}>
        <Grid item display='flex'>
          {props.iconStart}
        </Grid>
        <Grid item display='flex' alignItems='center'>
          <Typography>
            {props.text}
          </Typography>
        </Grid>
      </Grid>
      {props.iconEnd}
    </MovieProfileSectionWrapper>
  );
};

export default MovieProfileSection;
