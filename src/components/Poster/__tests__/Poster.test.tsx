import React from 'react';
import { shallow } from 'enzyme';
import Poster from '@components/Poster';

describe('<Poster />', () => {
  it('should render', () => {
    const component = shallow(<Poster name='test' image='test' />);

    expect(component).toMatchSnapshot();
  });
});
