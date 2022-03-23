import Search from '@components/Search'
import { shallow } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@state/store'

describe('<Search />', () => {
  it('should render transfer modal', () => {
    const component = shallow(
      <Provider store={store}>
        <Search />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
