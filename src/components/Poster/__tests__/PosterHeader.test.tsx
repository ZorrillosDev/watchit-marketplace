import React from 'react'
import { shallow } from 'enzyme'
import { PosterHeader } from '@components/Poster'

describe('<PosterHeader />', () => {
  it('should render', () => {
    const user = { username: 'test', profileUrl: 'www.com.png' }
    const component = shallow(<PosterHeader creator={user} owner={user} />)

    expect(component).toMatchSnapshot()
  })
})
