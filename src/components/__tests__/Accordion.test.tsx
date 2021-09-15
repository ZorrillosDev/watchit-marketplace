import React from 'react'
import { mount, shallow } from 'enzyme'
import { Accordion, AccordionSummary, AccordionDetails } from '@components/Accordion'
import { Theme } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { defaultTheme } from '@styles/theme'
import { Color } from '@src/utils'
import 'jest-styled-components'

/* eslint-disable no-undef */
describe('<Accordion />', () => {
  let theme: Theme

  beforeAll(() => {
    theme = createTheme(defaultTheme)
  })

  it('should render accordion with valid text', () => {
    const component = shallow(
      <Accordion>
        <AccordionDetails>
          test
        </AccordionDetails>
      </Accordion>
    )
    const componentDetail = component.find(AccordionDetails)

    expect(component).toMatchSnapshot()
    expect(componentDetail.text()).toContain('test')
  })

  it('should render accordion summary faq with valid theme styled', () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <AccordionSummary />
      </ThemeProvider>
    )

    expect(component).toHaveStyleRule(
      'background-color',
      Color.addAlpha(theme.palette.grey[50], 0.3),
      { modifier: ':hover' }
    )
  })

  it('should render accordion details faq with valid theme styled', () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <AccordionDetails />
      </ThemeProvider>
    )

    expect(component).toHaveStyleRule('color', '#9e9e9e')
    expect(component).toHaveStyleRule('color', theme.palette.grey[500])
  })
})
