import { mount } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@state/store'
import MovieProfileAcceptOffer from '@pages/Movie/components/MovieProfileAcceptOffer'
<<<<<<< HEAD
=======
import { Web3Actions } from '@state/web3/types'
import { Movie, MovieBid } from '@state/movies/types'
>>>>>>> main
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
<<<<<<< HEAD
        <MovieProfileAcceptOffer {...props} account='0x00' />
=======
        <MovieProfileAcceptOffer {...props} />
>>>>>>> main
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
