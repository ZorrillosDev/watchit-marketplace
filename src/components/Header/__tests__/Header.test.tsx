import React from 'react';
import { shallow } from 'enzyme';
import Header from '@components/Header';

describe('<Header>', () => {
  it('should render', () => {
    const component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });
});
