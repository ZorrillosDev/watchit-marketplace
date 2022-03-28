import SearchItem from '@components/Search/SearchItem'
import { shallow } from 'enzyme'
import React from 'react'
import { Movie } from '@state/movies/types'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<SearchItem />', () => {
  it('should render', () => {
    const component = shallow(
      <SearchItem {...{ posters: { small: 'test' } } as Movie} />
    )
    expect(component).toMatchSnapshot()
  })
})
