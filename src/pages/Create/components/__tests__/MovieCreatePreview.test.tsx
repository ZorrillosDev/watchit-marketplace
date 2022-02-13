import React from 'react'
import { mount, shallow } from 'enzyme'
import MovieCreatePreview, { MovieCreatePreviewIcon } from '@pages/Create/components/MovieCreatePreview'
import { PosterMedia } from '@components/Poster'
import i18n from '@src/i18n'
import { Typography } from '@mui/material'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieCreatePreview />', () => {
  const posters = 'test'

  it('should render', () => {
    const component = shallow(<MovieCreatePreview bid={3} title='test' poster={posters} />)

    expect(component).toMatchSnapshot()
  })

  it('should render movie create poster media', () => {
    const component = shallow(<MovieCreatePreview bid={3} title='test' poster={posters} />)

    expect(component.find(PosterMedia).exists()).toBeTruthy()
    expect(component.find(MovieCreatePreviewIcon).exists()).toBeFalsy()
  })

  it('should render movie create poster media placeholder', () => {
    const component = shallow(<MovieCreatePreview bid={3} title='test' />)

    expect(component.find(MovieCreatePreviewIcon).exists()).toBeTruthy()
    expect(component.find(PosterMedia).exists()).toBeFalsy()
  })
})
