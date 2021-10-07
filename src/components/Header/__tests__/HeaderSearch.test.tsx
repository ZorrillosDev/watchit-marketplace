import React from 'react'
import { shallow } from 'enzyme'
import HeaderSearch from '@components/Header/HeaderSearch'
import { InputBase } from '@mui/material'

/* eslint-disable no-undef */

describe('<HeaderSearch>', () => {
  it('should render', () => {
    const component = shallow(<HeaderSearch onSearch={() => {}} />)
    expect(component).toMatchSnapshot()
  })

  it('should search search call on search handler', () => {
    const onSearch = jest.fn()
    const component = shallow(<HeaderSearch onSearch={onSearch} />)
    const componentInput = component.find(InputBase)

    componentInput.simulate('keyUp', { target: { value: 'abcdefg' } })

    expect(onSearch).toHaveBeenCalled()
  })
})
