import React from 'react'
import { shallow, mount } from 'enzyme'
import WalletButton from '@components/WalletButton'
import * as web3Core from '@web3-react/core'
import 'jest-styled-components'
import { Button } from '@mui/material'
import { getLibrary } from '@src/w3'
import { Web3ReactProvider } from '@web3-react/core'
import { AccountBalanceWallet } from '@mui/icons-material'
import { PixelArtIdenticon } from '@components/Identicon'

jest.mock('@web3-react/core')

/* eslint-disable no-undef */
describe('<WalletButton/>', () => {
  beforeEach(() => {
    jest.spyOn(web3Core, 'useWeb3React')
      .mockImplementation(() => ({
        active: false,
        account: null,
        setError: jest.fn(),
        activate: jest.fn(),
        deactivate: jest.fn()
      })
      )
  })

  it('should render', () => {
    const walletButtonComponent = shallow(
      <Web3ReactProvider getLibrary={getLibrary}>
        <WalletButton />
      </Web3ReactProvider>
    )
    expect(walletButtonComponent).toMatchSnapshot()
  })

  it('should display english translation', () => {
    const walletButtonComponent = mount(<WalletButton />)
    const button = walletButtonComponent.find(Button)
    expect(walletButtonComponent.find(AccountBalanceWallet).length).toBe(1)
    expect(button.text()).toBe('Connect wallet')
  })

  it('should display error message if wallet connection fail with metamask', () => {
    jest.spyOn(web3Core, 'useWeb3React')
      .mockImplementation(() => ({
        active: false,
        account: null,
        setError: jest.fn(),
        deactivate: jest.fn(),
        activate () {
          throw new Error('Fail')
        }
      })
      )

    const walletButtonComponent = mount(<WalletButton />)
    const button = walletButtonComponent.find(Button)
    expect(button.text()).toBe('Connect wallet')
    button.simulate('click')
    expect(button.text()).toBe('Oops')
  })

  it('should display wallet connection if success with metamask', () => {
    jest.spyOn(web3Core, 'useWeb3React')
      .mockImplementation(() => ({
        active: true,
        account: null,
        setError: jest.fn(),
        deactivate: jest.fn(),
        activate: jest.fn()
      })
      )

    const walletButtonComponent = mount(<WalletButton />)
    const button = walletButtonComponent.find(Button)
    expect(walletButtonComponent.find(PixelArtIdenticon).length).toBe(1)
    expect(button.text()).toMatch('Connected')
  })
})
