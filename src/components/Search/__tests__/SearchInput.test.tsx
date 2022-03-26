import SearchInput from '@components/Search/SearchInput'
import { shallow } from 'enzyme'
import React from 'react'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<SearchInput />', () => {
  it('should render', () => {
    const component = shallow(
      <SearchInput onSearch={jest.fn()} handleCancel={jest.fn()} />
    )
    expect(component).toMatchSnapshot()
  })
})
