import React from 'react';
import { shallow } from 'enzyme';
import Sell from '../index';

/* eslint-disable no-undef */
describe('<Sell />', () => {
  it('should render', () => {
    const component = shallow(<Sell />);
    expect(component).toMatchSnapshot();
  });
});
