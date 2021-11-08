import React from 'react'
import { shallow } from 'enzyme'
import { PosterFooter } from '@components/Poster'

describe('<PosterFooter />', () => {
  it('should render', () => {
    const component = shallow(<PosterFooter isFavorite title='test' price={3} rate={4} />)

    expect(component).toMatchSnapshot()
  })
})
