import React from 'react'
import { mount, shallow } from 'enzyme'
import MovieProfileActivityTable from '@pages/Movie/components/MovieProfileActivityTable'
import i18n from '@src/i18n'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieProfileActivityTable />', () => {
  it('should render', () => {
    const component = shallow(<MovieProfileActivityTable rows={[]} />)

    expect(component).toMatchSnapshot()
  })

  it('should have movie profile activity table valid th text', () => {
    const translate1 = i18n.t('MOVIE_PROFILE_ACTIVITY_DATE')
    const translate2 = i18n.t('MOVIE_PROFILE_OWNER')
    const translate3 = i18n.t('MOVIE_PROFILE_ACTIVITY_EDITION')
    const translate4 = i18n.t('MOVIE_PROFILE_ACTIVITY_DETAILS')
    const component = mount(<MovieProfileActivityTable rows={[]} />)
    const tableHeader1 = component.find('th').at(0)
    const tableHeader2 = component.find('th').at(1)
    const tableHeader3 = component.find('th').at(2)
    const tableHeader4 = component.find('th').at(3)

    expect(tableHeader1.text()).toContain(translate1)
    expect(tableHeader2.text()).toContain(translate2)
    expect(tableHeader3.text()).toContain(translate3)
    expect(tableHeader4.text()).toContain(translate4)
  })
})
