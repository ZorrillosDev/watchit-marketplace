import React from 'react'
import { mount, shallow } from 'enzyme'
import { InputProperties } from '@components/Inputs'
import { Typography } from '@mui/material'
import i18n from '@src/i18n'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<InputProperties />', () => {
  it('should render', () => {
    const component = shallow(<InputProperties />)

    expect(component).toMatchSnapshot()
  })

  it('should have movie create form properties with valid title translation text', () => {
    const translate = i18n.t('MOVIE_CREATE_PROPERTIES')
    const component = mount(<InputProperties />)
    const typography = component.find(Typography).at(0)

    expect(typography.text()).toMatch(translate)
  })
})
