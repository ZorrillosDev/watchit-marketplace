import React from 'react'
import { shallow } from 'enzyme'
import Logo from '@components/Logo'

/* eslint-disable no-undef */
describe('Logo component', () => {
  it('should render', () => {
    const logoComponent = shallow(<Logo />)
    expect(logoComponent).toMatchSnapshot()
  })

  it('should render with white valid src', () => {
    const logoComponent = shallow(<Logo />)
    const imageEl = logoComponent.find('img')
    expect(imageEl.exists()).toEqual(true)
    expect(imageEl.props().src).toContain('icon.png')
  })
})
