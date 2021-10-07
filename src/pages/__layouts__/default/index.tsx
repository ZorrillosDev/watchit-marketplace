// react imports
import React, { FC, PropsWithChildren, ReactElement } from 'react'

// project imports
import Header from '@src/components/Header'

// mui imports
import { Container } from '@mui/material'

// ===========================|| DEFAULT LAYOUT ||=========================== //

export const DefaultLayout: FC<PropsWithChildren<any>> = ({ children }): ReactElement => {
  return (
    <Container
      maxWidth={false}
      sx={{
        pt: 8,
        px: { xs: 2, sm: 3, lg: 6, xl: 14 }
      }}
    >
      <Header />
      {children}
    </Container>
  )
}
