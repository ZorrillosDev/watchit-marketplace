import React from 'react';
import { shallow } from 'enzyme';
import ProfilePosters from '@pages/Profile/components/ProfilePosters';
import { FAKE_MOVIES } from '@src/config';

describe('<ProfilePosters />', () => {
  it('should render', () => {
    const component = shallow(<ProfilePosters posters={FAKE_MOVIES} />);

    expect(component).toMatchSnapshot();
  });
});
