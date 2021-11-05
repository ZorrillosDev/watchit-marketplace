import React from 'react'
import { shallow } from 'enzyme'
import Work from '../index'

/* eslint-disable no-undef */
describe('<Work />', () => {
  it('should render', () => {
    const component = shallow(<Work />)
    expect(component).toMatchSnapshot()
  })
})
