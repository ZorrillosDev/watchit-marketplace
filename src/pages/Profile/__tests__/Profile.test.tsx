import React from 'react';
import { shallow } from 'enzyme';
import Profile from '@pages/Profile';
import { Provider } from 'react-redux';
import { store } from '@state/store';

describe('<Profile />', () => {
  it('should render', () => {
    const component = shallow(
      <Provider store={store}>
        <Profile />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
