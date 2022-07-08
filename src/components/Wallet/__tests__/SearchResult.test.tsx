import SearchResults from '@components/Search/SearchResults';
import { shallow } from 'enzyme';
import React from 'react';

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<SearchResults />', () => {
  it('should render', () => {
    const component = shallow(
      <SearchResults anchorRef={null} movies={[]} open searching={false} />,
    );
    expect(component).toMatchSnapshot();
  });
});
