import TableIcon, { TableIconText } from '@components/Table/TableIcon'
import { Theme } from '@material-ui/core'
import { mount, shallow } from 'enzyme'
import 'jest-styled-components'
import React from 'react'
import { Transform } from '@components/Icons'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { defaultTheme } from '@styles/theme'

describe('<TableIcon />', () => {
  let theme: Theme

  beforeAll(() => {
    theme = createTheme(defaultTheme)
  })

  it('should render table icon', () => {
    const component = shallow(<TableIcon Icon={Transform}>test</TableIcon>)
    expect(component).toMatchSnapshot()
  })

  it('should have table icon props text', () => {
    const contentText = 'Test Module'
    const component = shallow(<TableIcon Icon={Transform}>{contentText}</TableIcon>)
    const tableIconText = component.find(TableIconText)

    expect(tableIconText.text()).toEqual(contentText)
  })

  it('should have table icon text valid theme styles', () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <TableIconText />
      </ThemeProvider>
    )

    // @ts-expect-error
    expect(component).toHaveStyleRule('color', theme.palette.grey[250])
  })
})
