import { Button } from '@material-ui/core'
import styled from 'styled-components'

const RoundButton = styled(Button)`
  border-radius: 50px;
  text-transform: none;
  padding: 0.4rem 1.5rem;
  font-weight: bold;

  .MuiButton-label {
    transform: translateY(2px);

    .MuiButton-startIcon {
      transform: translateY(-2px);
    }
  }
`

export default RoundButton
