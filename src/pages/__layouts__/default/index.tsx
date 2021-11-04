// react imports
import React, { FC, PropsWithChildren, ReactElement } from 'react'

// project imports
import Header from '@src/components/Header'

// mui imports
import { Box } from '@mui/material'

// ===========================|| DEFAULT LAYOUT ||=========================== //

export const DefaultLayout: FC<PropsWithChildren<any>> = ({ children }): ReactElement => {
  return (
    <Box sx={{ width: 1, height: 1, pt: 8 }}>
      <Header />
      {children}
    </Box>
  )
}
