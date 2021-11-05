import React from 'react'
import { shallow } from 'enzyme'
import Creator from '@components/Creator'

describe('<Creator />', () => {
  it('should render', () => {
    const component = shallow(
      <Creator
        name='jacob' username='jadapema' biography='test' coverUrl='www.com'
        profileUrl='www.com' followers={4} isFollowing={true}
      />
    )

    expect(component).toMatchSnapshot()
  })
})
