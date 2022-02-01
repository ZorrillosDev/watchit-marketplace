// MUI IMPORTS
import { Accordion, AccordionProps, styled } from '@mui/material'

// ===========================|| MOVIE - PROFILE - ACCORDION ||=========================== //

const MovieProfileAccordion = styled(Accordion)<AccordionProps>(({ theme }) => ({
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

export default MovieProfileAccordion
