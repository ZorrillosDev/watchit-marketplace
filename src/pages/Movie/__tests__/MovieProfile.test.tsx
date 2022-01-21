import React from 'react'
import { shallow } from 'enzyme'
import MovieProfile from '@pages/Movie'
import { Provider } from 'react-redux'
import { store } from '@state/store'

describe('<MovieProfile />', () => {
  it('should render', () => {
    const component = shallow(
      <Provider store={store}>
        <MovieProfile />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
