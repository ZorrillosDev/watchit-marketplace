import {
  TableWrapper, TableBody, TableColumn,
  TableScroller, TableHeader
} from '@components/Table/TableSeed'
import { Table, TableRow, Theme } from '@material-ui/core'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'
import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { defaultTheme } from '@styles/theme'

describe('<Table />', () => {
  let theme: Theme

  beforeAll(() => {
    theme = createTheme(defaultTheme)
  })

  it('should render table wrapper', () => {
    const component = shallow(<TableWrapper />)
    expect(component).toMatchSnapshot()
  })

  it('should have table wrapper valid styles', () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <TableWrapper />
      </ThemeProvider>
    )
    expect(component).toHaveStyleRule('box-shadow', 'none')
  })

  it('should have table scroller valid styles', () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <TableScroller />
      </ThemeProvider>
    )
    expect(component).toHaveStyleRule('border', `1px solid ${theme.palette.grey[200]}`)
    expect(component).toHaveStyleRule('border-radius', '1rem')
  })

  it('should render table scroller inner table', () => {
    const component = shallow(
      <TableScroller>
        <Table />
      </TableScroller>
    )

    const innerTable = component.find(Table)
    expect(innerTable.exists()).toBeTruthy()
  })

  it('should render table header', () => {
    const component = shallow(
      <ThemeProvider theme={theme}>
        <Table>
          <TableHeader />
        </Table>
      </ThemeProvider>
    )

    expect(component).toMatchSnapshot()
  })

  it('should have table column valid theme styles', () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableColumn />
            </TableRow>
          </TableHeader>
        </Table>
      </ThemeProvider>
    )

    // @ts-expect-error
    expect(component.find(TableColumn)).toHaveStyleRule('color', theme.palette.grey[250])
  })

  it('should render table body', () => {
    const component = shallow(
      <Table>
        <TableBody />
      </Table>
    )
    expect(component).toMatchSnapshot()
  })
}

)
