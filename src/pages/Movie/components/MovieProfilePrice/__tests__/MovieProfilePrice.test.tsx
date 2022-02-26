import React from 'react'
import {mount, shallow} from 'enzyme'
import MovieProfilePrice from '@pages/Movie/components/MovieProfilePrice'
import i18n from '@src/i18n'
import {Typography} from '@mui/material'
import {Movie} from '@state/movies/types'
import {Provider} from 'react-redux'
import {store} from '@state/store'
import * as web3Core from '@usedapp/core'
/* eslint-disable  @typescript-eslint/consistent-type-assertions */

jest.mock('react-router', () => ({
    useParams: () => {
        return {id: '123'}
    }
}))

jest.mock('@usedapp/core')
jest.mock('@hooks/useNFTContract', () => ({
    useNFTHolderOf: () => {
        return '0x0'
    }
}))

describe('<MovieProfilePrice />', () => {
    beforeEach(() => {
        jest.spyOn(web3Core, 'useEthers')
            .mockImplementation(() => ({
                    active: false,
                    connector: undefined,
                    error: undefined,
                    library: undefined,
                    chainId: undefined,
                    account: undefined,
                    setError: jest.fn(),
                    deactivate: jest.fn(),
                    activateBrowserWallet: jest.fn(),
                    activate: jest.fn()
                })
            )
    })

    const movie = {
        creator: '0xEe99CeFF640d37Edd9cac8c7cfF4Ed4cD609f435',
        token: '651268735865169554630764440897259763067310892845464250243992889613221274545'
    } as Movie

    it('should render', () => {
        const component = shallow(
            <Provider store={store}>
                <MovieProfilePrice {...movie} />
            </Provider>
        )
        expect(component).toMatchSnapshot()
    })

    it('should have movie profile price valid higher price text', () => {
        const translate = i18n.t('MOVIE_PROFILE_PRICE_HIGHER')
        const component = mount(
            <Provider store={store}>
                <MovieProfilePrice {...movie} />
            </Provider>
        )
        const typography = component.find(Typography).at(0)

        expect(typography.text()).toContain(translate)
    })

    it('should have movie profile price valid price text', () => {
        const price = 0
        const component = mount(
            <Provider store={store}>
                <MovieProfilePrice {...movie} price={price}/>
            </Provider>
        )
        const typography = component.find(Typography).at(1)

        expect(typography.text()).toContain(`${price} ETH`)
    })

    it('should have movie profile price valid owner text', () => {
        const translate = i18n.t('MOVIE_PROFILE_OWNER')
        const component = mount(
            <Provider store={store}>
                <MovieProfilePrice {...movie} />
            </Provider>
        )
        const typography = component.find(Typography).at(2)

        expect(typography.text()).toContain(translate)
    })
})
