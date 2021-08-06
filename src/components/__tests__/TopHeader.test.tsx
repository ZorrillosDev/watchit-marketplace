import React from 'react'
import { shallow} from 'enzyme'
import TopHeader from '@components/TopHeader'
import {WalletButton, Logo} from "@src/components";

/* eslint-disable no-undef */
describe('TopHeader component', () => {
  it('should render', () => {
    const topHeaderComponent = shallow(<TopHeader />)
    expect(topHeaderComponent).toMatchSnapshot()
  })

  it('should render with white color', () => {
    const topHeaderComponent = shallow(<TopHeader />)
    expect(topHeaderComponent.props().color).toBe('default')
  })

  it('should display logo', () => {
    const topHeaderComponent = shallow(<TopHeader />)
    expect(topHeaderComponent.containsMatchingElement(<Logo/>)).toBeTruthy()
  })

  it('should display wallet button', () => {
    const topHeaderComponent = shallow(<TopHeader />)
    expect(topHeaderComponent.containsMatchingElement(<WalletButton/>)).toBeTruthy()
  })
})
