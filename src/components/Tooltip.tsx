import { Tooltip as TooltipMui, withStyles } from '@material-ui/core'

export const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    fontSize: '0.75rem',
    fontWeight: 700
  }
}))(TooltipMui)

const Tooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '0.75rem',
    fontWeight: 700
  }
}))(TooltipMui)

export default Tooltip
