import React from 'react'
import { shallow } from 'enzyme'
import HomeRecent from '@pages/Home/components/HomeRecent'

describe('<HomeRecent />', () => {
  it('should render', () => {
    const component = shallow(<HomeRecent />)

    expect(component).toMatchSnapshot()
  })
})
