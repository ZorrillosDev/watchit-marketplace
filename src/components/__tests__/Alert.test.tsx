/* eslint-disable no-undef */
import { shallow } from 'enzyme'
import Alert from '@components/Alert'
import React from 'react'
import 'jest-styled-components'

describe('<Alert />', () => {
  it('should render', () => {
    const logo = shallow(<Alert />)
    expect(logo).toMatchSnapshot()
  })

  it('should render with white margin top', () => {
    const alertComponent = shallow(<Alert />)
    expect(alertComponent).toHaveStyleRule('margin-top', '0.5rem')
  })
})
