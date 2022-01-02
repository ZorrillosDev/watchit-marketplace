import React from 'react'
import { mount, shallow } from 'enzyme'
import MovieProfileHeader from '@pages/Movie/components/MovieProfileHeader'
import i18n from '@src/i18n'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieProfileHeader />', () => {
  it('should render', () => {
    const component = shallow(<MovieProfileHeader />)

    expect(component).toMatchSnapshot()
  })

  it('should have movie profile header valid share text', () => {
    const translate = i18n.t('MOVIE_PROFILE_HEADER_SHARE')
    const component = mount(<MovieProfileHeader />)
    const componentText = component.find('button').at(1)

    expect(componentText.exists()).toBeTruthy()
    expect(componentText.text()).toContain(translate)
  })
})
