import React from 'react';
import { shallow } from 'enzyme';
import ImagePicker from '@components/ImagePicker';
import Poster from '@components/Poster';
import { InputFileIcon } from '@components/Inputs';

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<ImagePicker />', () => {
  it('should render', () => {
    const component = shallow(
      <ImagePicker
        error={false} id='hello' title='hello' handleChange={() => {}}
        accept='' helpText='' name='hello' preview='hello'
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render movie create poster media', () => {
    const component = shallow(
      <ImagePicker
        error={false} id='world' title='world' handleChange={() => {}}
        accept='' helpText='' name='world' preview='world'
      />,
    );

    expect(component.find(Poster).exists()).toBeTruthy();
    expect(component.find(InputFileIcon).exists()).toBeFalsy();
  });

  it('should render movie create poster media placeholder', () => {
    const component = shallow(
      <ImagePicker
        error={false} id='test' title='test' handleChange={() => {}}
        accept='' helpText='' name='test' preview=''
      />,
    );

    expect(component.find(InputFileIcon).exists()).toBeTruthy();
    expect(component.find(Poster).exists()).toBeFalsy();
  });
});
