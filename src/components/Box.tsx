import React, { FC, PropsWithChildren } from 'react'
import { Typography, withTheme } from '@material-ui/core'
import styled from 'styled-components'

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */
const Box: FC<PropsWithChildren<{ title?: string }>> = ({ title, children }): JSX.Element => {
  return (
    <BoxWrapper>
      {
        title &&
          <BoxHeader variant='body1'>{title}</BoxHeader>
      }
      <BoxContent> {children} </BoxContent>
    </BoxWrapper>
  )
}

export default Box

export const BoxHorizontalWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  & > div {
    margin-right: 1rem;
    max-width: calc((100% / 3) - (2rem / 3));

    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }

  @media (min-width: 1900px) {
    & > div {
      margin-right: 1rem;
      max-width: calc((100% / 4) - (3rem / 4));

      &:nth-of-type(4n) {
        margin-right: 0;
      }
    }
  }

  @media (max-width: 992px) {
    & > div {
      margin-right: 1rem;
      max-width: calc((100% / 2) - 1rem);

      &:nth-of-type(2n) {
        margin-right: 0;
      }
    }
  }

  @media (max-width: 640px) {
    & > div {
      margin-right: 0;
      max-width: 100%;
    }
  }
`

export const BoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  margin-bottom: 1rem;
`

export const BoxHeader = withTheme(
  styled(Typography).attrs({ as: 'header' })`
    width: 100%;
    display: flex;
    padding: 1rem;
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;
  `
)

const BoxContent = styled.div`
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
`

export const BoxTitle = withTheme(
  styled(Typography)`
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem !important;

    @media (min-width: 1900px) {
      margin-bottom: 1.5rem !important;
    }
  `
)

export const BoxText = withTheme(
  styled(Typography)`
    color: ${({ theme }) => theme.palette.grey['500']};
    line-height: 1;
    text-align: center;
  `
)
