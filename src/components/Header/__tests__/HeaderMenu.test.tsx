import React from 'react'
import { mount, shallow } from 'enzyme'
import Menu from '@components/Header'
import { Item } from '@components/Header/HeaderMenu'
import { Theme, IconButton } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { defaultTheme } from '@styles/theme'
import 'jest-styled-components'
import { BrowserRouter } from 'react-router-dom'

/* eslint-disable no-undef */

describe('<Menu>', () => {
  let theme: Theme
  let mobileTheme: Theme

  beforeAll(() => {
    theme = createTheme(defaultTheme)
    mobileTheme = createTheme({ props: { MuiWithWidth: { initialWidth: 'xs' } } })
  })

  it('should render', () => {
    const component = shallow(<Menu />)
    expect(component).toMatchSnapshot()
  })

  it('should contain menu mobile button', () => {
    const component = mount(
      <ThemeProvider theme={mobileTheme}>\
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </ThemeProvider>
    )
    const mobileButton = component.find(IconButton)

    expect(mobileButton.exists()).toBeTruthy()
  })

  it('should have table status wrapper processing styles', () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <Item />
      </ThemeProvider>
    )

    expect(component).toHaveStyleRule('color', '#2286A5')
    expect(component).toHaveStyleRule('color', theme.palette.primary.main)
    expect(component).toHaveStyleRule('color', '#164C5D', { modifier: ':hover' })
    expect(component).toHaveStyleRule('color', theme.palette.primary.dark, { modifier: ':hover' })
  })
})
