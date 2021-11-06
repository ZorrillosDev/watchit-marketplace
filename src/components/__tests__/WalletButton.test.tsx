import React from 'react'
import {shallow, mount} from 'enzyme'
import WalletButton from '@components/WalletButton'
import * as web3Core from '@usedapp/core'
import 'jest-styled-components'
import {Button} from '@mui/material'
import { DAppProvider } from '@usedapp/core'
import {AccountBalanceWallet} from '@mui/icons-material'
import {PixelArtIdenticon} from '@components/Identicon'
import {config} from '@src/w3/'

jest.mock('@usedapp/core')

/* eslint-disable no-undef */
describe('<WalletButton/>', () => {
    beforeEach(() => {
        jest.spyOn(web3Core, 'useEthers')
            .mockImplementation(() => ({
                    active: false,
                    library: undefined,
                    chainId: undefined,
                    account: null,
                    setError: jest.fn(),
                    deactivate: jest.fn(),
                    activateBrowserWallet: jest.fn(),
                    activate: jest.fn(),
                })
            )
    })

    it('should render', () => {
        const walletButtonComponent = shallow(
            <DAppProvider config={config}>
                <WalletButton/>
            </DAppProvider>
        )
        expect(walletButtonComponent).toMatchSnapshot()
    })

    it('should display english translation', () => {
        const walletButtonComponent = mount(<WalletButton/>)
        const button = walletButtonComponent.find(Button)
        expect(walletButtonComponent.find(AccountBalanceWallet).length).toBe(1)
        expect(button.text()).toBe('Connect wallet')
    })


    it('should display wallet connection if success with metamask', () => {
        jest.spyOn(web3Core, 'useEthers')
            .mockImplementation(() => ({
                    active: true,
                    library: undefined,
                    chainId: undefined,
                    account: '0x0',
                    setError: jest.fn(),
                    deactivate: jest.fn(),
                    activateBrowserWallet: jest.fn(),
                    activate: jest.fn(),
                })
            )

        const walletButtonComponent = mount(<WalletButton/>)
        expect(walletButtonComponent.find(PixelArtIdenticon).length).toBe(1)
    })
})
