import React from 'react'
import { shallow } from 'enzyme'
import HomeSliderCard from '@pages/Home/components/HomeSliderCard'

describe('<HomeSliderCard />', () => {
  it('should render', () => {
    const slideTest = {
      image: 'test.jpg',
      title: 'Avengers: Endgame / Vengadores 4',
      description: 'Tras los sucesos de “Vengadores: Infinity War”',
      owner: {
        name: '@nickcsefar',
        profilePicture: 'thumb.jpg'
      },
      price: 34.5,
      rate: 2340
    }
    const component = shallow(<HomeSliderCard slide={slideTest} />)

    expect(component).toMatchSnapshot()
  })
})
