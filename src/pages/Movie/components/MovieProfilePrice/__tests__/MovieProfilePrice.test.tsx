import React from 'react'
import { mount, shallow } from 'enzyme'
import MovieProfilePrice from '@pages/Movie/components/MovieProfilePrice'
import i18n from '@src/i18n'
import { Typography } from '@mui/material'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieProfilePrice />', () => {
  it('should render', () => {
    const component = shallow(<MovieProfilePrice />)

    expect(component).toMatchSnapshot()
  })

  it('should have movie profile price valid higher price text', () => {
    const translate = i18n.t('MOVIE_PROFILE_PRICE_HIGHER')
    const component = mount(<MovieProfilePrice />)
    const typography = component.find(Typography).at(0)

    expect(typography.text()).toContain(translate)
  })

  it('should have movie profile price valid price text', () => {
    const price = 0
    const component = mount(<MovieProfilePrice />)
    const typography = component.find(Typography).at(1)

    expect(typography.text()).toContain(`${price} ETH`)
  })

  it('should have movie profile price valid owner text', () => {
    const translate = i18n.t('MOVIE_PROFILE_OWNER')
    const component = mount(<MovieProfilePrice />)
    const typography = component.find(Typography).at(3)

    expect(typography.text()).toContain(translate)
  })
})
