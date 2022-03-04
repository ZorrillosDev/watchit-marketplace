import { mount } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@state/store'
import MovieProfilePay from '@pages/Movie/components/MovieProfilePay'

/* eslint-disable no-undef */

jest.mock('react-router', () => ({
  useParams: () => {
    return { id: '123' }
  }
}))

describe('<MovieProfilePay />', () => {
  it('should render', () => {
    const component = mount(
      <Provider store={store}>
        <MovieProfilePay price={1} title='test' />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
