import React from 'react'
import { shallow } from 'enzyme'
import { PosterFooter } from '@components/Poster'

describe('<PosterFooter />', () => {
  it('should render', () => {
    const component = shallow(<PosterFooter name='test' price={3} rating={4} />)

    expect(component).toMatchSnapshot()
  })
})
