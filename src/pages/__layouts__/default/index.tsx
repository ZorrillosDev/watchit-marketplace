import { Container } from '@material-ui/core'
import React, { FC, PropsWithChildren, ReactElement } from 'react'
import styled from 'styled-components'
import Header from '@src/components/Header'

export const DefaultLayout: FC<PropsWithChildren<any>> = ({ children }): ReactElement => {
  return (
    <DefaultLayoutWrapper maxWidth={false}>
      <Header />
      {children}
    </DefaultLayoutWrapper>
  )
}

const DefaultLayoutWrapper = styled(Container)`
  padding-top: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 100%;
  width: 100%;

  @media (min-width: 600px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (min-width: 1200px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media (min-width: 1400px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }
  
  @media (min-width: 1900px) {
    padding-left: 10rem;
    padding-right: 10rem;
  }
`
