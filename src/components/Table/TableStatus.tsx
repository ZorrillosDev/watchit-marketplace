import styled from 'styled-components'
import { Typography, WithTheme, withTheme } from '@material-ui/core'
import React, { FC, PropsWithChildren } from 'react'

export const TableStatus: FC<PropsWithChildren<{ color: string }>> = (props): JSX.Element => {
  return (
    <TableStatusWrapper {...props}>
      <Typography>
        {props.children}
      </Typography>
    </TableStatusWrapper>
  )
}

export default TableStatus

export const TableStatusWrapper = withTheme(
  styled.div<WithTheme & { color: string }>`
    display: flex;
    padding: 6px 1rem;
    width: fit-content;
    align-items: center;
    justify-content: flex-start;
    border-radius: 5px;
    line-height: 1;
    text-transform: lowercase;
    transform: translateY(2px);
    background-color: ${({ theme, color }) => theme.palette[color].light};
    
    p {
      color: ${({ theme, color }) => theme.palette[color].dark} !important;
      font-weight: bold;
      text-transform: lowercase;
    }
  `
)
