import React from 'react'
import { mount, shallow } from 'enzyme'
import MovieCreateFormProperties from '@pages/Movie/Create/components/MovieCreateFormProperties'
import { Typography } from '@mui/material'
import i18n from '@src/i18n'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieCreateFormProperties />', () => {
  it('should render', () => {
    const component = shallow(<MovieCreateFormProperties />)

    expect(component).toMatchSnapshot()
  })

  it('should have movie create form properties with valid title translation text', () => {
    const translate = i18n.t('MOVIE_CREATE_PROPERTIES')
    const component = mount(<MovieCreateFormProperties />)
    const typography = component.find(Typography).at(0)

    expect(typography.text()).toMatch(translate)
  })
})
