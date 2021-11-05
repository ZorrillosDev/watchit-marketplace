// mui imports
import { styled, Tooltip as TooltipMui, TooltipProps } from '@mui/material'

// ===========================|| TOOLTIP VARIATIONS ||=========================== //

export const LightTooltip = styled(TooltipMui)<TooltipProps>(({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette.primary.main,
  fontSize: '0.75rem',
  fontWeight: 700
}))

const Tooltip = styled(TooltipMui)<TooltipProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: '0.75rem',
  fontWeight: 700
}))

export default Tooltip
