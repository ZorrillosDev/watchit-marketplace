import React from 'react'
import { shallow } from 'enzyme'
import RoundButton from '@components/RoundButton'
import 'jest-styled-components'

/* eslint-disable no-undef */
describe('RoundButton component', () => {
    it('should render', () => {
        const alertComponent = shallow(<RoundButton />)
        expect(alertComponent).toMatchSnapshot()
    })

    it('should render with white border-radius', () => {
        const alertComponent = shallow(<RoundButton />)
        expect(alertComponent).toHaveStyleRule('border-radius', '50px')
    })
})
