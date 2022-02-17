import React from 'react'
import { shallow } from 'enzyme'
import {
  InputFileButton,
  InputFileElement,
  InputFileIcon,
  InputFileLabel,
  InputFileLabelText
} from '@components/Inputs/InputFile'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<InputFile />', () => {
  it('should render input file element', () => {
    const component = shallow(
      <InputFileElement />
    )

    expect(component).toMatchSnapshot()
  })

  it('should render input file icon', () => {
    const component = shallow(
      <InputFileIcon />
    )

    expect(component).toMatchSnapshot()
  })

  it('should render input file label text', () => {
    const component = shallow(
      <InputFileLabelText />
    )

    expect(component).toMatchSnapshot()
  })

  it('should render input file label', () => {
    const component = shallow(
      <InputFileLabel isFull filled />
    )

    expect(component).toMatchSnapshot()
  })

  it('should render input file button', () => {
    const component = shallow(
      <InputFileButton href='www.com' />
    )

    expect(component).toMatchSnapshot()
  })
})
