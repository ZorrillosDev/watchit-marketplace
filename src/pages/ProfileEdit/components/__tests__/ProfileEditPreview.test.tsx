import React from 'react';
import { shallow } from 'enzyme';
import ProfileEditPreview from '@pages/ProfileEdit/components/ProfileEditPreview';

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<ProfileEditPreview />', () => {
  it('should render', () => {
    const component = shallow(<ProfileEditPreview />);

    expect(component).toMatchSnapshot();
  });
});
