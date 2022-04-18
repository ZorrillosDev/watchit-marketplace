import MovieCreateModalProgress from '@pages/Create/components/MovieCreateModalProgress';
import { mount } from 'enzyme';
import React from 'react';
import i18n from '@src/i18n';
import { Typography } from '@mui/material';

describe('<MovieCreateModalProgress />', () => {
  const handleClose = jest.fn();

  it('should render', () => {
    const component = mount(
      <MovieCreateModalProgress open handleClose={handleClose} progress={50} />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should have movie create modal progress "success uploaded" valid text', () => {
    const translate = i18n.t('MOVIE_CREATE_SUCCESS_UPLOADED');
    const component = mount(
      <MovieCreateModalProgress open handleClose={handleClose} progress={100} />,
    );
    const typography = component.find(Typography).at(0);
    expect(typography.text()).toMatch(translate);
  });

  it('should have movie create modal progress "success uploaded message" valid text', () => {
    const translate = i18n.t('MOVIE_CREATE_SUCCESS_UPLOADED_MESSAGE');
    const component = mount(
      <MovieCreateModalProgress open handleClose={handleClose} progress={100} />,
    );
    const typography = component.find(Typography).at(1);
    expect(typography.text()).toMatch(translate);
  });

  it('should have movie create modal progress "success uploading" valid text', () => {
    const translate = i18n.t('MOVIE_CREATE_SUCCESS_UPLOADING');
    const component = mount(
      <MovieCreateModalProgress open handleClose={handleClose} progress={50} />,
    );
    const typography = component.find(Typography).at(0);
    expect(typography.text()).toMatch(translate);
  });

  it('should have movie create modal progress "success uploading message" valid text', () => {
    const translate = i18n.t('MOVIE_CREATE_SUCCESS_UPLOADING_MESSAGE');
    const component = mount(
      <MovieCreateModalProgress open handleClose={handleClose} progress={50} />,
    );
    const typography = component.find(Typography).at(1);
    expect(typography.text()).toMatch(translate);
  });
});
