import React from 'react'
import { mount, shallow } from 'enzyme'
import HeaderSearch, { SearchWrapper, SearchInput } from '@components/Header/HeaderSearch'
import 'jest-styled-components'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'
import { defaultTheme } from '@styles/theme'

/* eslint-disable no-undef */

describe('<HeaderSearch>', () => {
  let theme: Theme

  beforeAll(() => {
    theme = createTheme(defaultTheme)
  })

  it('should render', () => {
    const component = shallow(<HeaderSearch onSearch={() => {}} />)
    expect(component).toMatchSnapshot()
  })

  it('should have search wrapper valid theme styles', () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <SearchWrapper />
      </ThemeProvider>
    )

    expect(component).toHaveStyleRule('border', '1px solid #bdbdbd')
    expect(component).toHaveStyleRule('border', `1px solid ${theme.palette.grey[400]}`)
  })

  it('should search search call on search handler', () => {
    const onSearch = jest.fn()
    const component = shallow(<HeaderSearch onSearch={onSearch} />)
    const componentInput = component.find(SearchInput)

    componentInput.simulate('keyUp', { target: { value: 'abcdefg' } })

    expect(onSearch).toHaveBeenCalled()
  })
})
