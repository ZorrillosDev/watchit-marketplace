import React from 'react'
import { shallow } from 'enzyme'
import { InputFile, InputFileIcon } from '@components/Inputs/InputFile'
import Poster from '@components/Poster'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<InputFile />', () => {
  it('should render', () => {
    const component = shallow(
      <InputFile
        error={false} id='hello' title='hello' handleChange={() => {}}
        accept='' helpText='' name='hello' image='hello'
      />
    )

    expect(component).toMatchSnapshot()
  })

  it('should render movie create poster media', () => {
    const component = shallow(
      <InputFile
        error={false} id='world' title='world' handleChange={() => {}}
        accept='' helpText='' name='world' image='world'
      />
    )

    expect(component.find(Poster).exists()).toBeTruthy()
    expect(component.find(InputFileIcon).exists()).toBeFalsy()
  })

  it('should render movie create poster media placeholder', () => {
    const component = shallow(
      <InputFile
        error={false} id='test' title='test' handleChange={() => {}}
        accept='' helpText='' name='test' image=''
      />
    )

    expect(component.find(InputFileIcon).exists()).toBeTruthy()
    expect(component.find(Poster).exists()).toBeFalsy()
  })
})
