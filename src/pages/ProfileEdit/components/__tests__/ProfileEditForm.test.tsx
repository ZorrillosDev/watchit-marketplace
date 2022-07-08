import ProfileEditForm from '@pages/ProfileEdit/components/ProfileEditForm';
import { mount } from 'enzyme';
import React from 'react';
import i18n from '@src/i18n';
import { Button } from '@mui/material';

describe('<ProfileEditForm />', () => {
  const onSubmit = jest.fn();
  const setCover = jest.fn();
  const setPoster = jest.fn();
  const setUserName = jest.fn();
  const functions = {
    setCover,
    setPoster,
    setUserName,
  };

  it('should render', () => {
    const component = mount(
      <ProfileEditForm onSubmit={onSubmit} poster={'test'} cover={'test'} userName={'test'} {...functions} />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should have profile edit form "name" with valid label text', () => {
    const translate = i18n.t('MOVIE_CREATE_NAME');
    const component = mount(
      <ProfileEditForm onSubmit={onSubmit} poster={'test'} cover={'test'} userName={'test'} {...functions} />,
    );

    const label = component.find('label').at(2);
    expect(label.text()).toMatch(translate);
  });

  it('should have profile edit form "name" with valid helper text', () => {
    const translate = i18n.t('MOVIE_CREATE_NAME_HELP_TEXT');
    const component = mount(
      <ProfileEditForm onSubmit={onSubmit} poster={'test'} cover={'test'} userName={'test'} {...functions} />,
    );
    const label = component.find('.MuiFormHelperText-root').at(0);

    expect(label.text()).toMatch(translate);
  });

  it('should have profile edit form "description" with valid label text', () => {
    const translate = i18n.t('MOVIE_CREATE_DESCRIPTION');
    const component = mount(
      <ProfileEditForm onSubmit={onSubmit} poster={'test'} cover={'test'} userName={'test'} {...functions} />,
    );

    const label = component.find('label').at(3);
    expect(label.text()).toMatch(translate);
  });

  it('should have profile edit form "description" with valid helper text', () => {
    const translate = i18n.t('MOVIE_CREATE_DESCRIPTION_HELP_TEXT');
    const component = mount(
      <ProfileEditForm onSubmit={onSubmit} poster={'test'} cover={'test'} userName={'test'} {...functions} />,
    );
    const label = component.find('.MuiFormHelperText-root').at(2);

    expect(label.text()).toMatch(translate);
  });

  it('should have profile edit form "bid" with valid label text', () => {
    const translate = i18n.t('MOVIE_CREATE_BID');
    const component = mount(
      <ProfileEditForm onSubmit={onSubmit} poster={'test'} cover={'test'} userName={'test'} {...functions} />,
    );
    const label = component.find('label').at(4);

    expect(label.text()).toMatch(translate);
  });

  it('should have profile edit form "bid" with valid helper text', () => {
    const translate = i18n.t('MOVIE_CREATE_BID_HELP_TEXT');
    const component = mount(
      <ProfileEditForm onSubmit={onSubmit} poster={'test'} cover={'test'} userName={'test'} {...functions} />,
    );
    const label = component.find('.MuiFormHelperText-root').at(4);

    expect(label.text()).toMatch(translate);
  });

  it('should have profile edit form "trailer" with valid label text', () => {
    const translate = i18n.t('MOVIE_CREATE_TRAILER');
    const component = mount(
      <ProfileEditForm onSubmit={onSubmit} poster={'test'} cover={'test'} userName={'test'} {...functions} />,
    );
    const label = component.find('label').at(5);
    expect(label.text()).toMatch(translate);
  });

  it('should have profile edit form "button" with valid text', () => {
    const translate = i18n.t('MOVIE_CREATE_ADD_BUTTON');
    const component = mount(
      <ProfileEditForm onSubmit={onSubmit} poster={'test'} cover={'test'} userName={'test'} {...functions} />,
    );
    const button = component.find(Button).last();

    expect(button.text()).toMatch(translate);
  });
});
