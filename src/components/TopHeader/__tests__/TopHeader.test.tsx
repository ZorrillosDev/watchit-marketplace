import React from 'react'
import { shallow } from 'enzyme'
import TopHeader from '@components/TopHeader'
import 'jest-styled-components'

/* eslint-disable no-undef */
describe('TopHeader component', () => {
  it('should render', () => {
    const alertComponent = shallow(<TopHeader />)
    expect(alertComponent).toMatchSnapshot()
  })

  it('should render with white background-color', () => {
    const alertComponent = shallow(<TopHeader />)
    expect(alertComponent).toHaveStyleRule('background-color', '#ffffff')
  })
})
