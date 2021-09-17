import styled from 'styled-components'
import { WithTheme, withTheme } from '@material-ui/core'
import React, { FC, PropsWithChildren } from 'react'
import { IconWrapper } from '@components/Icons'

const TableIcon: FC<PropsWithChildren<{ Icon: FC }>> = ({ Icon, children }): JSX.Element => {
  return (
    <TableIconWrapper>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <TableIconText>
        {children}
      </TableIconText>
    </TableIconWrapper>
  )
}

export default TableIcon

export const TableIconColored = withTheme(
  styled.div<WithTheme & { color: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    svg {
      fill: ${({ theme, color }) => theme.palette[color].main} !important;
    }
  `
)

export const TableIconWrapper = withTheme(
  styled.div<WithTheme>`
    display: flex;

    svg {
      fill: ${({ theme }) => theme.palette.grey[250]};
    }
  `
)

export const TableIconText = withTheme(
  styled.div<WithTheme>`
    color: ${({ theme }) => theme.palette.grey[250]};
    margin-left: 0.5rem;
  `
)
