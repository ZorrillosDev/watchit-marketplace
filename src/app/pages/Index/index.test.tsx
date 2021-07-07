import React from 'react'
import { shallow } from 'enzyme'
import Login from './index'

/* eslint-disable no-undef */
describe('Login component', () => {
  it('should render', () => {
    const loginComponent = shallow(<Login />)
    expect(loginComponent).toMatchSnapshot()
  })
})
