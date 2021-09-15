import React from 'react'
import { shallow } from 'enzyme'
import RoundButton from '@components/Button/RoundButton'
import 'jest-styled-components'

/* eslint-disable no-undef */
describe('<RoundButton />', () => {
  it('should render', () => {
    const roundButtonComponent = shallow(<RoundButton />)
    expect(roundButtonComponent).toMatchSnapshot()
  })

  it('should render with white border-radius', () => {
    const roundButtonComponent = shallow(<RoundButton />)
    expect(roundButtonComponent).toHaveStyleRule('border-radius', '50px')
  })
})
