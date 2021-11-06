import React from 'react'
import { shallow } from 'enzyme'
import HomeSlider  from '@pages/Home/components/HomeSlider'
import { PosterProps } from "@components/Poster";

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<HomeSlider />', () => {
  it('should render', () => {
    const component = shallow(<HomeSlider slides={[] as PosterProps[]} />)

    expect(component).toMatchSnapshot()
  })
})
