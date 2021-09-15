import styled from 'styled-components'
import {
  Accordion as AccordionMui,
  AccordionDetails as AccordionDetailsMui,
  AccordionSummary as AccordionSummaryMui
  , withTheme
} from '@material-ui/core'

import { Color } from '@src/utils'

export const Accordion = styled(AccordionMui)`
  width: 100%;
  box-shadow: 0px -1px 1px -1px rgb(0 0 0 / 20%), 0px 1px 3px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`

export const AccordionSummary = withTheme(
  styled(AccordionSummaryMui)`
    &:hover {
      background-color: ${({ theme }) => Color.addAlpha(theme.palette.grey[50], 0.3)};
    }
  `
)

export const AccordionDetails = withTheme(
  styled(AccordionDetailsMui)`
    color: ${({ theme }) => theme.palette.grey[500]};
  `
)
