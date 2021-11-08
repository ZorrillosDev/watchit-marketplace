import React from 'react'
import { shallow } from 'enzyme'
import Poster from '@components/Poster'

describe('<Poster />', () => {
  it('should render', () => {
    const component = shallow(<Poster title='test' posterUrl='test' />)

    expect(component).toMatchSnapshot()
  })
})
