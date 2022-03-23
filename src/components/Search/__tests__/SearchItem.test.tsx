import SearchItem from '@components/Search/SearchItem'
import { shallow } from 'enzyme'
import React from 'react'
import { Movie } from "@state/movies/types";

describe('<SearchItem />', () => {
  it('should render', () => {
    const component = shallow(
      <SearchItem movie={{} as Movie }/>
    )
    expect(component).toMatchSnapshot()
  })
})
