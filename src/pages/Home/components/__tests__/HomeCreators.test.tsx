import React from 'react'
import { shallow } from 'enzyme'
import HomeCreators from '@pages/Home/components/HomeCreators'

describe('<HomeCreators />', () => {
  it('should render', () => {
    const component = shallow(<HomeCreators />)

    expect(component).toMatchSnapshot()
  })
})
