import React from 'react'
import { shallow } from 'enzyme'
import HomeSlider from '@pages/Home/components/HomeSlider'
import { HomeRecentPosterProps } from '@pages/Home/components/HomeRecentPoster'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<HomeSlider />', () => {
  it('should render', () => {
    const component = shallow(<HomeSlider slides={[] as HomeRecentPosterProps[]} />)

    expect(component).toMatchSnapshot()
  })
})
