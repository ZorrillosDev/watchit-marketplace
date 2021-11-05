import React from 'react'
import { shallow } from 'enzyme'
import Festival from '../index'

/* eslint-disable no-undef */
describe('<Festival />', () => {
  it('should render', () => {
    const component = shallow(<Festival />)
    expect(component).toMatchSnapshot()
  })
})
