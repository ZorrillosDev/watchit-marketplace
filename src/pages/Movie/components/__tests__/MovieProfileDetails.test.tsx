import React from 'react'
import { shallow } from 'enzyme'
import MovieProfileDetails from '@pages/Movie/components/MovieProfileDetails'
import { Movie } from '@state/movies/types'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieProfileDetails />', () => {
  const fakeMovie = {
    genres: ['a', 'b'],
    imdb_code: 'test',
    language: 'en',
    rating: 5,
    runtime: 66,
    year: 1996
  } as unknown as Movie

  it('should render', () => {
    const component = shallow(<MovieProfileDetails {...fakeMovie} />)

    expect(component).toMatchSnapshot()
  })
})
