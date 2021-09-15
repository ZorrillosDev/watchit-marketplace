import React from 'react'
import { mount, shallow } from 'enzyme'
import Box, {
  BoxHorizontalWrapper, BoxHeader, BoxWrapper,
  BoxText, BoxTitle
} from '@components/Box'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { defaultTheme } from '@styles/theme'
import { Theme } from '@material-ui/core'
import 'jest-styled-components'

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

describe('<Box />', () => {
  let theme: Theme

  beforeAll(() => {
    theme = createTheme(defaultTheme)
  })

  it('should render', () => {
    const component = shallow(<Box title='Test Module' />)
    expect(component).toMatchSnapshot()
  })

  it('should pass if box header exist in module', () => {
    const component = shallow(<Box title='Test Module' />)
    const header = component.find(BoxHeader)

    expect(header.exists()).toBeTruthy()
  })

  it('should fail if box header exist in module', () => {
    const component = shallow(<Box />)
    const header = component.find(BoxHeader)

    expect(header.exists()).toBeFalsy()
  })

  it('should have box props text', () => {
    const titleText = 'Test Module'
    const component = shallow(<Box title={titleText} />)
    const headerText = component.find(BoxHeader)

    expect(headerText.text()).toEqual(titleText)
  })

  it('should have box horizontal wrapper valid styles', () => {
    const component = shallow(<BoxHorizontalWrapper />)

    expect(component).toHaveStyleRule('width', '100%')
    expect(component).toHaveStyleRule('display', 'flex')
    expect(component).toHaveStyleRule('flex-wrap', 'wrap')
  })

  it('should have box wrapper valid styles', () => {
    const component = shallow(<BoxWrapper />)

    expect(component).toHaveStyleRule('width', '100%')
    expect(component).toHaveStyleRule('display', 'flex')
    expect(component).toHaveStyleRule('flex-direction', 'column')
    expect(component).toHaveStyleRule('box-shadow', '2px 2px 8px rgba(0,0,0,0.15)')
  })

  it('should have box header valid theme styles', () => {
    const boxHeader = mount(
      <ThemeProvider theme={theme}>
        <BoxHeader />
      </ThemeProvider>
    )

    expect(boxHeader).toHaveStyleRule('color', theme.palette.primary.main)
    expect(boxHeader).toHaveStyleRule('color', '#2286A5')
  })

  it('should have box title valid theme styles', () => {
    const boxTitle = mount(
      <ThemeProvider theme={theme}>
        <BoxTitle />
      </ThemeProvider>
    )

    expect(boxTitle).toHaveStyleRule('color', theme.palette.primary.main)
    expect(boxTitle).toHaveStyleRule('color', '#2286A5')
  })

  it('should have box text valid theme styles', () => {
    const boxText = mount(
      <ThemeProvider theme={theme}>
        <BoxText />
      </ThemeProvider>
    )

    expect(boxText).toHaveStyleRule('color', theme.palette.grey['500'])
    expect(boxText).toHaveStyleRule('color', '#9e9e9e')
  })
})
