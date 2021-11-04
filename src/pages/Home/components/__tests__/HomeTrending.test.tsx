import React from 'react'
import { shallow } from 'enzyme'
import HomeTrending from '@pages/Home/components/HomeTrending'

describe('<HomeTrending />', () => {
  it('should render', () => {
    const component = shallow(<HomeTrending />)

    expect(component).toMatchSnapshot()
  })
})
