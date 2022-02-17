import { mount } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@state/store'
import ModalBid from '@components/ModalBid'

/* eslint-disable no-undef */
describe('<ModalBid />', () => {
  it('should render', () => {
    const component = mount(
      <Provider store={store}>
        <ModalBid />
      </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
