import React from 'react'
import { mount, shallow } from 'enzyme'
import MovieProfileOffersTable from '@pages/Movie/components/MovieProfileOffersTable'
import i18n from '@src/i18n'
import { Movie } from '@state/movies/types'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieProfileOffersTable />', () => {
  it('should render', () => {
    const component = shallow(<MovieProfileOffersTable rows={[]} movie={{} as Movie} />)

    expect(component).toMatchSnapshot()
  })

  it('should have movie profile offers table valid th text', () => {
    const translate1 = i18n.t('MOVIE_PROFILE_OFFERS_TABLE_FROM')
    const translate2 = i18n.t('MOVIE_PROFILE_OFFERS_TABLE_PRICE')
    const translate3 = i18n.t('MOVIE_PROFILE_OFFERS_TABLE_DATE')
    const component = mount(<MovieProfileOffersTable rows={[]} movie={{} as Movie} />)
    const th1 = component.find('th').at(0)
    const th2 = component.find('th').at(1)
    const th3 = component.find('th').at(2)

    expect(th1.text()).toContain(translate1)
    expect(th2.text()).toContain(translate2)
    expect(th3.text()).toContain(translate3)
  })
})
