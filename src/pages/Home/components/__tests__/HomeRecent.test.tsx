import React from 'react'
import {shallow} from 'enzyme'
import HomeRecent from '@pages/Home/components/HomeRecent'
import {Provider} from 'react-redux'
import {store} from '@state/store'

describe('<HomeRecent />', () => {
    it('should render', () => {
        const component = shallow(
            <Provider store={store}>
                <HomeRecent/>
            </Provider>
        )

        expect(component).toMatchSnapshot()
    })
})
