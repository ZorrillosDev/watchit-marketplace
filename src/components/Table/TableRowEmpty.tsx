import { Typography, withTheme, TableRow } from '@material-ui/core'
import React, { FC } from 'react'
import { TableColumn } from '@components/Table/TableSeed'

export const TableRowEmpty: FC = (): JSX.Element => {
  return (
    <TableRow>
      <TableColumn align='center'>
        <Typography>
          No results found
        </Typography>
      </TableColumn>
    </TableRow>
  )
}

export default withTheme(TableRowEmpty)
