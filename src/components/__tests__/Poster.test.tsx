import React from 'react'
import { shallow } from 'enzyme'
import Poster from '@components/Poster'

describe('<Poster />', () => {
  it('should render', () => {
    const component = shallow(
      <Poster
        title='test' price={3} rate={3}
        isFavorite posterUrl='test' showDetails
        creator={{ username: 'test', profileUrl: 'test' }}
        owner={{ username: 'test', profileUrl: 'test' }}
        description='test'
      />
    )

    expect(component).toMatchSnapshot()
  })
})
