// REACT IMPORTS
import React, { FC } from 'react';

// MUI IMPORTS
import { Box, BoxProps, styled, Typography } from '@mui/material';

// PROJECT IMPORTS
import { Translation } from '@src/i18n';

/* eslint-disable  @typescript-eslint/restrict-template-expressions */
/* eslint-disable  @typescript-eslint/strict-boolean-expressions */
/* eslint-disable  @typescript-eslint/prefer-optional-chain */

// ===========================|| SUMMARY ||=========================== //

export const SummaryWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  margin: '0.5rem 0 1rem 0',
  width: '100%',
}));

export const SummaryRow = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1rem',
  '&:last-of-type': {
    marginBottom: 0,
  },
  '& p:first-of-type': {
    color: 'text.primary',
    marginRight: '3rem',
  },
  '& p:last-of-type': {
    color: 'primary',
  },
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    color: '#57B894',
  },
}));

export const SummarySeparator = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  letterSpacing: '4px',
  marginBottom: '0.5rem',
  borderBottom: `2px dashed ${theme.palette.divider}`,
}));

export const SummaryTitle: FC<{ title?: string }> = ({ title }) => {
  return (
    <Typography textAlign='center' fontWeight='bold' color='primary' sx={{ mb: 2, mt: 1 }} variant='h4'>
      {title ?? <Translation target='GLOBAL_SUMMARY' />}
    </Typography>
  );
};
