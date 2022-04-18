// REACT IMPORTS
import React, { FC, useState } from 'react';

// MUI IMPORTS
import {
  Accordion, AccordionDetails, AccordionSummary, SwitchProps,
  Box, styled, Typography, BoxProps, Switch,
} from '@mui/material';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| INPUTS - SWITCH ||=========================== //

export interface InputSwitchProps {
  label: string | JSX.Element
  subtitle: string | JSX.Element
  content?: JSX.Element
  defaultChecked?: boolean
}

export const InputSwitch: FC<InputSwitchProps> = (props): JSX.Element => {
  const [checked, setChecked] = useState(props.defaultChecked ?? false);

  const handleChange = (event: any): void => {
    setChecked(event.target.checked);
  };

  return (
    <InputSwitchWrapper>
      <Box display='flex' flexDirection='row' alignItems='center' width={1}>
        <Box display='flex' flexDirection='column' flexGrow={1}>
          <Typography variant='body2' color='primary' fontWeight={600}>{props.label}</Typography>
          <Typography variant='body1' color='primary' sx={{ opacity: 0.8 }}>{props.subtitle}</Typography>
        </Box>
        <InputSwitchElement
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Box>
      <Accordion expanded={checked} sx={{ m: '0 !important', width: 1, '&:before': { display: 'none' } }}>
        <AccordionSummary sx={{ minHeight: '0px !important', height: 0 }} />
        <AccordionDetails sx={{ p: 0, pt: props.content ? '1rem' : 0 }}>
          {props.content}
        </AccordionDetails>
      </Accordion>
    </InputSwitchWrapper>
  );
};

const InputSwitchWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
}));

const InputSwitchElement = styled(Switch)<SwitchProps>(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: theme.palette.primary.main,
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
