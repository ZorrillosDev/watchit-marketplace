import React from 'react';
import { shallow } from 'enzyme';
import ProfileTabs from '@pages/Profile/components/ProfileTabs';
import { FAKE_MOVIES } from '@src/config';

describe('<ProfileTabs />', () => {
  it('should render', () => {
    const component = shallow(<ProfileTabs created={FAKE_MOVIES} collected={FAKE_MOVIES} />);

    expect(component).toMatchSnapshot();
  });
});
