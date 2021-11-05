import React from 'react'
import { shallow } from 'enzyme'
import HeartCounter from '@components/HeartCounter'

describe('<HeartCounter />', () => {
  it('should render', () => {
    const component = shallow(<HeartCounter count={4} favorite={false} />)

    expect(component).toMatchSnapshot()
  })
})
