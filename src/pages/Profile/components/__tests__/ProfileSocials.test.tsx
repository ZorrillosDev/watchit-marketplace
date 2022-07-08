import React from 'react';
import { shallow } from 'enzyme';
import ProfileSocials from '@pages/Profile/components/ProfileSocials';

describe('<ProfileSocials />', () => {
  it('should render', () => {
    const component = shallow(<ProfileSocials />);

    expect(component).toMatchSnapshot();
  });
});
