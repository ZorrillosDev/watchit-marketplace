import React from 'react'
import { shallow } from 'enzyme'
import MovieProfile from '@pages/Movie/Profile'

describe('<MovieProfile />', () => {
  it('should render', () => {
    const component = shallow(<MovieProfile id='4' />)

    expect(component).toMatchSnapshot()
  })
})
