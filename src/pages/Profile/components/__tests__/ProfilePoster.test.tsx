import React from 'react';
import { shallow } from 'enzyme';
import ProfilePoster from '@pages/Profile/components/ProfilePoster';
import { FAKE_MOVIES } from '@src/config';

describe('<ProfilePoster />', () => {
  it('should render', () => {
    const component = shallow(<ProfilePoster {...FAKE_MOVIES[0]} />);

    expect(component).toMatchSnapshot();
  });
});
