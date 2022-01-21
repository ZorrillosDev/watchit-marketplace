import React from 'react'
import { mount, shallow } from 'enzyme'
import MovieProfileDetail from '@pages/Movie/components/MovieProfileDetail'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieProfileDetail />', () => {
  it('should render', () => {
    const component = shallow(<MovieProfileDetail text='test' />)

    expect(component).toMatchSnapshot()
  })

  it('should render movie profile detail valid link', () => {
    const linkText = 'link here!'
    const component = mount(<MovieProfileDetail text='test' link={{ text: linkText, href: 'www.com' }} />)
    const link = component.find('a')

    expect(link.exists()).toBeTruthy()
    expect(link.text()).toContain(linkText)
  })
})
