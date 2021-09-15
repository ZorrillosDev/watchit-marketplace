import styled from 'styled-components'
import LogoPng from '@assets/icons/icon.png'

const Logo = styled.img`
  max-width: 50px;
  transform: translateY(-1px);
`

Logo.defaultProps = {
  src: LogoPng
}
export default Logo
