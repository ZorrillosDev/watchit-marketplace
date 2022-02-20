import React from 'react'
import { mount, shallow } from 'enzyme'
import MovieProfileOffersTable from '@pages/Movie/components/MovieProfileOffersTable'
import i18n from '@src/i18n'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieProfileOffersTable />', () => {
  it('should render', () => {
    const component = shallow(<MovieProfileOffersTable rows={[]} />)

    expect(component).toMatchSnapshot()
  })

  it('should have movie profile offers table valid th text', () => {
    const translate1 = i18n.t('MOVIE_PROFILE_OFFERS_TABLE_FROM')
    const translate2 = i18n.t('MOVIE_PROFILE_OFFERS_TABLE_PRICE')
    const translate3 = i18n.t('MOVIE_PROFILE_OFFERS_TABLE_USD_PRICE')
    const translate4 = i18n.t('MOVIE_PROFILE_OFFERS_TABLE_DATE')
    const translate5 = i18n.t('MOVIE_PROFILE_OFFERS_TABLE_EXPIRATION')
    const component = mount(<MovieProfileOffersTable rows={[]} />)
    const th1 = component.find('th').at(0)
    const th2 = component.find('th').at(1)
    const th3 = component.find('th').at(2)
    const th4 = component.find('th').at(3)
    const th5 = component.find('th').at(4)

    expect(th1.text()).toContain(translate1)
    expect(th2.text()).toContain(translate2)
    expect(th3.text()).toContain(translate3)
    expect(th4.text()).toContain(translate4)
    expect(th5.text()).toContain(translate5)
  })
})