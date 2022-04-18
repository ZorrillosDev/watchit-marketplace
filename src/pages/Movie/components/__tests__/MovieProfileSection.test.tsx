import React from 'react';
import { shallow } from 'enzyme';
import MovieProfileSection from '@pages/Movie/components/MovieProfileSection';
import { Map, Store } from '@components/Icons';
import { Typography } from '@mui/material';

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieProfileSection />', () => {
  it('should render', () => {
    const component = shallow(<MovieProfileSection iconStart={<Map />} iconEnd={<Store />} text='test' />);

    expect(component).toMatchSnapshot();
  });

  it('should have movie profile section valid text', () => {
    const text = 'test1';
    const component = shallow(<MovieProfileSection iconStart={<Map />} iconEnd={<Store />} text={text} />);
    const typography = component.find(Typography).at(0);

    expect(typography.text()).toContain(text);
  });
});
