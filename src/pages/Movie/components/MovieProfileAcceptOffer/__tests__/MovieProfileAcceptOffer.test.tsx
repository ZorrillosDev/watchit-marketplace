import { mount } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@state/store'
import MovieProfileAcceptOffer from '@pages/Movie/components/MovieProfileAcceptOffer'
import {
  MovieProfileAcceptOfferContainerProps
} from '@pages/Movie/components/MovieProfileAcceptOffer/MovieProfileAcceptOfferContainer'

/* eslint-disable no-undef */
/* eslint-disable  @typescript-eslint/consistent-type-assertions */

jest.mock('react-router', () => ({
  useParams: () => {
    return { id: '123' }
  }
}))

describe('<MovieProfileAcceptOffer />', () => {
  it('should render', () => {
    const props = {} as MovieProfileAcceptOfferContainerProps
    const component = mount(
      <Provider store={store}>
        <MovieProfileAcceptOffer {...props} account='0x00' />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
