import styled from 'styled-components'
import LogoPng from '@assets/icons/icon.png'

const Logo = styled.img`
  border-radius: 50px;
  max-width: 40px;
`

Logo.defaultProps = {
  src: LogoPng
}
export default Logo
