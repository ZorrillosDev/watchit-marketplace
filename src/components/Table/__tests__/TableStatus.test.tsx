import TableStatus, { TableStatusWrapper } from '@components/Table/TableStatus'
import { Theme, Typography } from '@material-ui/core'
import { mount, shallow } from 'enzyme'
import 'jest-styled-components'
import React from 'react'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { defaultTheme } from '@styles/theme'

describe('<TableStatus />', () => {
  let theme: Theme

  beforeAll(() => {
    theme = createTheme(defaultTheme)
  })

  it('should render table status', () => {
    const component = shallow(<TableStatus color='success' />)
    expect(component).toMatchSnapshot()
  })

  it('should render table status processing status', () => {
    const component = shallow(
      <TableStatus color='warning'>
        Processing
      </TableStatus>)
    const text = component.find(Typography)

    expect(text.text()).toEqual('Processing')
  })

  it('should render table status sent status', () => {
    const component = shallow(
      <TableStatus color='warning'>
        Sent
      </TableStatus>)
    const text = component.find(Typography)

    expect(text.text()).toEqual('Sent')
  })

  it('should have table status wrapper processing styles', () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <TableStatusWrapper color='warning' />
      </ThemeProvider>
    )

    expect(component).toHaveStyleRule('background-color', '#ffb74d')
    expect(component).toHaveStyleRule('background-color', theme.palette.warning.light)
  })

  it('should have table status wrapper sent styles', () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <TableStatusWrapper color='success' />
      </ThemeProvider>
    )

    expect(component).toHaveStyleRule('background-color', '#81c784')
    expect(component).toHaveStyleRule('background-color', theme.palette.success.light)
  })
})
