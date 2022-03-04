import { mount } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@state/store'
import MovieProfileAcceptOffer from '@pages/Movie/components/MovieProfileAcceptOffer'

/* eslint-disable no-undef */

jest.mock('react-router', () => ({
  useParams: () => {
    return { id: '123' }
  }
}))

describe('<MovieProfileAcceptOffer />', () => {
  it('should render', () => {
    const component = mount(
      <Provider store={store}>
        <MovieProfileAcceptOffer price={1} />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
