// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Typography } from '@mui/material'

// THIRD PARTY IMPORTS
import Big from 'big.js'

// PROJECT IMPORTS
import { SummarySeparator, SummaryWrapper, SummaryRow } from '@components/Summary'

// ===========================|| CASH OUT MODAL - SUMMARY ||=========================== //

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

export interface ModalBidSummaryProps {
  amount: number
  balance: number
  fee: number
}

const ModalBidSummary: FC<ModalBidSummaryProps> = (props) => {
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
        <Typography variant='body1' color='textPrimary'>{Big(props.amount * props.fee).toFixed(5)} ETH</Typography>
      </SummaryRow>
      <SummaryRow>
        <SummarySeparator />
      </SummaryRow>
      <SummaryRow>
        <Typography variant='body1' color='textSecondary'>
          You will pay
        </Typography>
        <Typography variant='h4' color='inherit'>{Big(props.amount + (props.amount * props.fee)).toFixed(5)} ETH</Typography>
      </SummaryRow>
      <SummaryRow>
        <Typography variant='body1' color='textSecondary'>
          Your balance will be
        </Typography>
        <Typography variant='body1' color='inherit'>{Big(props.amount ? props.balance - (props.amount + props.fee) : props.balance).toFixed(5)} ETH</Typography>
      </SummaryRow>
    </SummaryWrapper>
  )
}

export default ModalBidSummary
