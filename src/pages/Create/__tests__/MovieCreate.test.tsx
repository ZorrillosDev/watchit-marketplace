import React from 'react'
import { mount, shallow } from 'enzyme'
import MovieCreate from '@pages/Create'
import { MovieCreateView } from '@pages/Create/MovieCreateView'
import i18n from '@src/i18n'
import { Typography } from '@mui/material'

describe('<MovieCreate />', () => {
  it('should render', () => {
    const component = shallow(<MovieCreate />)

    expect(component).toMatchSnapshot()
  })

  it('should have movie create with valid movie create translation text', () => {
    const translate = i18n.t('MOVIE_CREATE_MINT')
    const component = mount(
      <MovieCreateView
        bid={0} poster='test.png' setBid={() => {}} name='test'
        setFilm={() => {}} setName={() => {}} setPoster={() => {}} film='test.png'
      />
    )
    const section = component.find(Typography).at(0)

    expect(section.text()).toMatch(translate)
  })

  it('should have movie create with valid movie preview translation text', () => {
    const previewTranslate = i18n.t('MOVIE_CREATE_PREVIEW')
    const movieCreate = mount(
      <MovieCreateView
        bid={0} setName={() => {}} setBid={() => {}} film='hello.png' name='hello'
        setPoster={() => {}} setFilm={() => {}} poster='hello.png'
      />
    )
    const section = movieCreate.find(Typography).at(9)

    expect(section.text()).toMatch(previewTranslate)
  })
})
