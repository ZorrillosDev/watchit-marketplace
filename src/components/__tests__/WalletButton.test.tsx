import React from 'react'
import { shallow } from 'enzyme'
import WalletButton from '@components/WalletButton'
import 'jest-styled-components'

/* eslint-disable no-undef */
describe('WalletButton component', () => {
  it('should render', () => {
    const walletButtonComponent = shallow(<WalletButton />)
    expect(walletButtonComponent).toMatchSnapshot()
  })

  it('should display english translation', () => {
    const walletButtonComponent = shallow(<WalletButton />)
    expect(walletButtonComponent.dive().text()).toBe('Wallet')
  })
}
)
