import React from 'react';
import { shallow } from 'enzyme';
import Explore from '../index';

/* eslint-disable no-undef */
describe('<Explore />', () => {
  it('should render', () => {
    const component = shallow(<Explore />);
    expect(component).toMatchSnapshot();
  });
});
