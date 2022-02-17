// MUI IMPORTS
import { TextField, styled, TextFieldProps } from '@mui/material'

// ===========================|| INPUT - TEXT - FIELD ||=========================== //

export const InputTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  width: '100%',
  'label, input, textarea': {
    color: theme.palette.text.primary,
    fontWeight: 600
  }
}))
