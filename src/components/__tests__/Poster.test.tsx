import React from 'react'
import { shallow } from 'enzyme'
import Poster from '@components/Poster'

describe('<Poster />', () => {
  it('should render', () => {
    const component = shallow(
      <Poster
        title='test' value={3} favoriteCount={3}
        isFavorite posterUrl='test'
        creator={{ username: 'test', profileUrl: 'test' }}
        owner={{ username: 'test', profileUrl: 'test' }}
      />
    )

    expect(component).toMatchSnapshot()
  })
})
