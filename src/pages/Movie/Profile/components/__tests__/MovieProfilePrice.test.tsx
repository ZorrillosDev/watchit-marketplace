import React from 'react'
import { mount, shallow } from 'enzyme'
import MovieProfilePrice from '@pages/Movie/Profile/components/MovieProfilePrice'
import i18n from '@src/i18n'
import { Typography } from '@mui/material'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieProfilePrice />', () => {
  it('should render', () => {
    const component = shallow(<MovieProfilePrice owner={{ address: '00' }} name='test' price={4} rating={3} />)

    expect(component).toMatchSnapshot()
  })

  it('should have movie profile price valid higher price text', () => {
    const translate = i18n.t('MOVIE_PROFILE_PRICE_HIGHER')
    const component = mount(<MovieProfilePrice owner={{ address: '00' }} name='test' price={4} rating={3} />)
    const typography = component.find(Typography).at(0)

    expect(typography.text()).toContain(translate)
  })

  it('should have movie profile price valid price text', () => {
    const price = 4
    const component = mount(<MovieProfilePrice owner={{ address: '00' }} name='test' price={price} rating={3} />)
    const typography = component.find(Typography).at(1)

    expect(typography.text()).toContain(`${price} ETH`)
  })

  it('should have movie profile price valid owner text', () => {
    const translate = i18n.t('MOVIE_PROFILE_OWNER')
    const component = mount(<MovieProfilePrice owner={{ address: '00' }} name='test' price={4} rating={3} />)
    const typography = component.find(Typography).at(3)

    expect(typography.text()).toContain(translate)
  })
})
