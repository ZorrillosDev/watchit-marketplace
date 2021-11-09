import React from 'react'
import { shallow } from 'enzyme'
import { PosterHeader } from '@components/Poster'

describe('<PosterHeader />', () => {
  it('should render', () => {
    const component = shallow(<PosterHeader creator={'test'} />)

    expect(component).toMatchSnapshot()
  })
})
