import React from 'react'
import { shallow } from 'enzyme'
import Home from '@pages/Home'

describe('<Dashboard />', () => {
  it('should render', () => {
    const component = shallow(<Home />)

    expect(component).toMatchSnapshot()
  })
})
