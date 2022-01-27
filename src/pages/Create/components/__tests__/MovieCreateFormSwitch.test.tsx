import React from 'react'
import { shallow } from 'enzyme'
import MovieCreateFormSwitch from '@pages/Create/components/MovieCreateFormSwitch'
import { Typography } from '@mui/material'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieCreateFormSwitch />', () => {
  it('should render', () => {
    const component = shallow(<MovieCreateFormSwitch title='hello world' subtitle='test hehe' />)

    expect(component).toMatchSnapshot()
  })

  it('should have movie create form switch with valid title and subtitle text', () => {
    const title = 'hello world'
    const subTitle = 'test hehe'
    const component = shallow(<MovieCreateFormSwitch title={title} subtitle={subTitle} />)

    expect(component.find(Typography).at(0).text()).toMatch(title)
    expect(component.find(Typography).at(1).text()).toMatch(subTitle)
  })
})
