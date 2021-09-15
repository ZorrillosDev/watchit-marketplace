import React from 'react'
import { shallow } from 'enzyme'
import Header from '@components/Header'
import { TopHeaderWrapper } from '@components/Header/HeaderView'
import 'jest-styled-components'

/* eslint-disable no-undef */

describe('<Header>', () => {
  it('should render', () => {
    const component = shallow(<Header />)
    expect(component).toMatchSnapshot()
  })

  it('should have top header wrapper open valid styles', () => {
    const component = shallow(<TopHeaderWrapper open />)
    expect(component).toHaveStyleRule('transform', 'none !important')
    expect(component).toHaveStyleRule('visibility', 'visible !important')
  })

  it('should have top header wrapper close valid styles', () => {
    const component = shallow(<TopHeaderWrapper open={false} />)
    expect(component).toHaveStyleRule('transform', 'auto')
    expect(component).toHaveStyleRule('visibility', 'auto')
  })
})
