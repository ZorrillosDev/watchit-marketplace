import React from 'react'
import { shallow } from 'enzyme'
import Menu from '@components/Header'

/* eslint-disable no-undef */

describe('<Menu>', () => {
  it('should render', () => {
    const component = shallow(<Menu />)
    expect(component).toMatchSnapshot()
  })
})
