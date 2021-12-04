import React from 'react'
import { shallow } from 'enzyme'
import MovieCreateFormFile, { MovieCreateFileIcon } from '@pages/Movie/Create/components/MovieCreateFormFile'
import Poster from '@components/Poster'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieCreatePoster />', () => {
  it('should render', () => {
    const component = shallow(
      <MovieCreateFormFile
        error={false} id='hello' title='hello' handleChange={() => {}}
        accept='' helpText='' name='hello' image='hello'
      />
    )

    expect(component).toMatchSnapshot()
  })

  it('should render movie create poster media', () => {
    const component = shallow(
      <MovieCreateFormFile
        error={false} id='world' title='world' handleChange={() => {}}
        accept='' helpText='' name='world' image='world'
      />
    )

    expect(component.find(Poster).exists()).toBeTruthy()
    expect(component.find(MovieCreateFileIcon).exists()).toBeFalsy()
  })

  it('should render movie create poster media placeholder', () => {
    const component = shallow(
      <MovieCreateFormFile
        error={false} id='test' title='test' handleChange={() => {}}
        accept='' helpText='' name='test' image=''
      />
    )

    expect(component.find(MovieCreateFileIcon).exists()).toBeTruthy()
    expect(component.find(Poster).exists()).toBeFalsy()
  })
})
