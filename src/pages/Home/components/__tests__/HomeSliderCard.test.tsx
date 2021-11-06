import React from 'react'
import { shallow } from 'enzyme'
import HomeSliderCard from '@pages/Home/components/HomeSliderCard'

describe('<HomeSliderCard />', () => {
  it('should render', () => {
    const slideTest = {
      title: 'Avengers: Endgame / Vengadores 4',
      description: 'Tras los sucesos de “Vengadores: Infinity War”',
      owner: {
        username: '@nickcsefar',
        profileUrl: 'thumb.jpg'
      },
      price: 34.5,
      rate: 2340,
      creator: {
        username: '@gmena',
        profileUrl: 'https://mui.com/static/images/avatar/1.jpg'
      },
      posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/10/este-nino-es-un-trasto-50575-poster-200x300.jpg',
      isFavorite: false
    }
    const component = shallow(<HomeSliderCard slide={slideTest} />)

    expect(component).toMatchSnapshot()
  })
})
