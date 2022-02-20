import React from 'react'
import {mount, shallow} from 'enzyme'
import MovieCreate from '@pages/Create'
import {MovieCreateView} from '@pages/Create/MovieCreateView'
import i18n from '@src/i18n'
import {Typography} from '@mui/material'
import {Provider} from 'react-redux'
import {store} from '@state/store'

describe('<MovieCreate />', () => {
    it('should render', () => {
        const component = shallow(
            <Provider store={store}>
                <MovieCreate/>
            </Provider>
        )

        expect(component).toMatchSnapshot()
    })

    it('should have movie create with valid movie create translation text', () => {
        const translate = i18n.t('MOVIE_CREATE_MINT')
        const component = mount(
            <MovieCreateView onSubmit={() => {
            }}/>
        )

        const section = component.find(Typography).at(0)
        expect(section.text()).toMatch(translate)
    })

    it('should have movie create with valid movie preview translation text', () => {
        const previewTranslate = i18n.t('MOVIE_CREATE_PREVIEW')
        const movieCreate = mount(
            <MovieCreateView onSubmit={() => {
            }}/>
        )

        const section = movieCreate.find(Typography).at(8)
        expect(section.text()).toMatch(previewTranslate)
    })
})
