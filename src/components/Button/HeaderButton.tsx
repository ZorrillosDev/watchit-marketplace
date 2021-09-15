import React, { FC } from 'react'
import { ButtonProps } from '@material-ui/core'
import { TabletAndDown, TabletAndUp } from '@styles/breakpoints'
import styled from 'styled-components'
import RoundButton from '@components/Button/RoundButton'

interface HeaderButtonProps {
  text: string
  mobileText: string
}

/* eslint-disable  @typescript-eslint/explicit-function-return-type */
const HeaderButton: FC<HeaderButtonProps & ButtonProps> = ({ text, mobileText, ...props }): JSX.Element => {
  return (
    <HeaderButtonStyled {...props}>
      <TabletAndUp> {text} </TabletAndUp>
      <TabletAndDown> {mobileText} </TabletAndDown>
    </HeaderButtonStyled>
  )
}

export default HeaderButton

export const HeaderButtonStyled = styled(RoundButton)`
  border-style: solid;
  margin-left: 0.5rem;
  border-radius: 0.5rem;
  padding: 6px 1.5rem;
  height: 2rem;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.15);

  span {
    margin-top: 4px;
  }

  @media (max-width: 640px) {
    padding: 6px 1rem;
  }
  
  @media (max-width: 380px) {
    padding: 6px 0.5rem;
  }
`
