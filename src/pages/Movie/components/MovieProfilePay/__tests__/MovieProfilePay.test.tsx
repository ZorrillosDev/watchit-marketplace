import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@state/store';
import MovieProfilePay from '@pages/Movie/components/MovieProfilePay';
import { MovieProfilePayContainerProps } from '@pages/Movie/components/MovieProfilePay/MovieProfilePayContainer';

/* eslint-disable no-undef */
/* eslint-disable  @typescript-eslint/consistent-type-assertions */

jest.mock('react-router', () => ({
  useParams: () => {
    return { id: '123' };
  },
}));

describe('<MovieProfilePay />', () => {
  it('should render', () => {
    const props = {} as MovieProfilePayContainerProps;
    const component = mount(
      <Provider store={store}>
        <MovieProfilePay {...props} />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
