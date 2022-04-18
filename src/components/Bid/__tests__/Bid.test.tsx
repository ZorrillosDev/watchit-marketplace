import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@state/store';
import Bid from '@components/Bid';

/* eslint-disable no-undef */

jest.mock('react-router', () => ({
  useParams: () => {
    return { id: '123' };
  },
}));

describe('<Bid />', () => {
  it('should render', () => {
    const component = mount(
      <Provider store={store}>
        <Bid />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
