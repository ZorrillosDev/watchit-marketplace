import React from 'react'
import { shallow } from 'enzyme'
import { PosterMedia } from '@components/Poster'

describe('<PosterMedia />', () => {
  it('should render', () => {
    const component = shallow(<PosterMedia title='test' posterUrl='test' />)

    expect(component).toMatchSnapshot()
  })
})
