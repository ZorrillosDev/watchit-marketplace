import React from 'react'
import { shallow } from 'enzyme'
import {Provider} from "react-redux";
import {store} from "@state/store";
import HomeCreators from "@pages/Home/components/HomeCreators";

describe('<HomeCreators />', () => {
  it('should render', () => {
    const component = shallow(
        <Provider store={store}>
          <HomeCreators />
        </Provider>
    )

    expect(component).toMatchSnapshot()
  })
})
