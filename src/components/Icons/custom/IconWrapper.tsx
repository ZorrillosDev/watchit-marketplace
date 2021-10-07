// mui imports
import { Box, BoxProps, styled } from '@mui/material'

// ===========================|| ICONS WRAPPER ||=========================== //

export const IconWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '1rem',
  height: '1rem',
  '& svg': {
    width: '100%',
    height: '100%'
  }
}))
