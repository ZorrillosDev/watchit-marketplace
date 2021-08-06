import { Grid } from '@material-ui/core'
import styled from 'styled-components'

const TopHeaderContainer = styled(Grid)`
  position: fixed;
  height: 3.5rem;
  background-color: #ffffff;
  box-shadow: #333333 1px 1px 1px;
`

TopHeaderContainer.defaultProps = {
  container: true
}
export default TopHeaderContainer
