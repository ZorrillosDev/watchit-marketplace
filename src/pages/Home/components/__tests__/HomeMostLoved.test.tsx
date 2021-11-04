import React from 'react'
import { shallow } from 'enzyme'
import HomeMostLoved from '@pages/Home/components/HomeMostLoved'

describe('<HomeMostLoved />', () => {
  it('should render', () => {
    const component = shallow(<HomeMostLoved />)

    expect(component).toMatchSnapshot()
  })
})
