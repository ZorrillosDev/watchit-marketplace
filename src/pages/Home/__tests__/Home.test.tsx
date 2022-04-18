import React from 'react';
import { shallow } from 'enzyme';
import Home from '@pages/Home';

describe('<Home />', () => {
  it('should render', () => {
    const component = shallow(<Home />);

    expect(component).toMatchSnapshot();
  });
});
