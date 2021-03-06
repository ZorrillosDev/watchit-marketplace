// REACT IMPORTS
import React, { FC } from 'react';

// MUI IMPORTS
import { Typography } from '@mui/material';

// THIRD PARTY IMPORTS
import Big from 'big.js';

// PROJECT IMPORTS
import { SummarySeparator, SummaryWrapper, SummaryRow } from '@components/Summary';

// ===========================|| BID - SUMMARY ||=========================== //

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

export interface BidSummaryProps {
  amount: number
  balance: string
  fee: number
}

const BidSummary: FC<BidSummaryProps> = (props) => {
  return (
    <SummaryWrapper>
      <SummaryRow>
        <Typography variant='body1' color='textSecondary'>Your balance</Typography>
        <Typography variant='body1' color='textPrimary'>{Big(props.balance).toFixed(5)} ETH</Typography>
      </SummaryRow>
      <SummaryRow>
        <Typography variant='body1' color='textSecondary'>Your bidding</Typography>
        <Typography variant='body1' color='textPrimary'>{Big(props.amount).toFixed(5)} ETH</Typography>
      </SummaryRow>
      <SummaryRow>
        <Typography variant='body1' color='textSecondary'>Service fee</Typography>
        <Typography
          variant='body1'
          color='textPrimary'
        >{Big(props.amount * props.fee).toFixed(5)} ETH
        </Typography>
      </SummaryRow>
      <SummaryRow>
        <SummarySeparator />
      </SummaryRow>
      <SummaryRow>
        <Typography variant='body1' color='textSecondary'>
          You will pay
        </Typography>
        <Typography variant='h4' color='inherit'>
          {Big(props.amount + (props.amount * props.fee)).toFixed(5)} ETH
        </Typography>
      </SummaryRow>
    </SummaryWrapper>
  );
};

export default BidSummary;
