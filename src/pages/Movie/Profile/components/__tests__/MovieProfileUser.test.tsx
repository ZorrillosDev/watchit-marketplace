import React from 'react'
import { shallow } from 'enzyme'
import MovieProfileUser from '@pages/Movie/Profile/components/MovieProfileUser'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieProfileUser />', () => {
  it('should render', () => {
    const component = shallow(<MovieProfileUser address='00' />)

    expect(component).toMatchSnapshot()
  })
})
