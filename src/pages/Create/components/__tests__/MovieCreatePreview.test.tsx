import React from 'react'
import { mount, shallow } from 'enzyme'
import MovieCreatePreview, { MovieCreatePreviewIcon } from '@pages/Create/components/MovieCreatePreview'
import { PosterMedia } from '@components/Poster'
import i18n from '@src/i18n'
import { Typography } from '@mui/material'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieCreatePreview />', () => {
  const posters = { small: 'test', large: 'test', medium: 'test' }

  it('should render', () => {
    const component = shallow(<MovieCreatePreview bid={3} description='test' creator='test' title='test' posters={posters} />)

    expect(component).toMatchSnapshot()
  })

  it('should render movie create poster media', () => {
    const component = shallow(<MovieCreatePreview bid={3} description='test' creator='test' title='test' posters={posters} />)

    expect(component.find(PosterMedia).exists()).toBeTruthy()
    expect(component.find(MovieCreatePreviewIcon).exists()).toBeFalsy()
  })

  it('should render movie create poster media placeholder', () => {
    const component = shallow(<MovieCreatePreview bid={3} description='test' creator='test' title='test' />)

    expect(component.find(MovieCreatePreviewIcon).exists()).toBeTruthy()
    expect(component.find(PosterMedia).exists()).toBeFalsy()
  })

  it('should have movie create poster with valid poster media placeholder translation text', () => {
    const translate = i18n.t('MOVIE_CREATE_PREVIEW_HELP')
    const component = mount(<MovieCreatePreview bid={3} description={translate} creator='test' title='test' />)
    const typography = component.find(Typography).at(0)

    expect(typography.text()).toMatch(translate)
  })
})
