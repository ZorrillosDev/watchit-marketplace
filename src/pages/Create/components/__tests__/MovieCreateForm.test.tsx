import MovieCreateForm from '@pages/Create/components/MovieCreateForm'
import { mount } from 'enzyme'
import React from 'react'
import i18n from '@src/i18n'
import { Button } from '@mui/material'

describe('<MovieCreateForm />', () => {
  const setPrice = jest.fn()
  const setPoster = jest.fn()
  const setTitle = jest.fn()
  const setFilm = jest.fn()
  const functions = {
    setPrice,
    setPoster,
    setTitle,
    setFilm
  }

  it('should render', () => {
    const component = mount(
      <MovieCreateForm onSubmit={() => {}} film='1' poster='1' {...functions} />
    )

    expect(component).toMatchSnapshot()
  })

  it('should have movie create form "name" with valid label text', () => {
    const translate = i18n.t('MOVIE_CREATE_NAME')
    const component = mount(<MovieCreateForm
      onSubmit={() => {
      }} poster='d' film='d' {...functions}
                            />)
    const label = component.find('label').at(2)

    expect(label.text()).toMatch(translate)
  })

  it('should have movie create form "name" with valid helper text', () => {
    const translate = i18n.t('MOVIE_CREATE_NAME_HELP_TEXT')
    const component = mount(<MovieCreateForm
      onSubmit={() => {
      }} poster='fg' film='sd' {...functions}
                            />)
    const label = component.find('.MuiFormHelperText-root').at(0)

    expect(label.text()).toMatch(translate)
  })

  it('should have movie create form "description" with valid label text', () => {
    const translate = i18n.t('MOVIE_CREATE_DESCRIPTION')
    const component = mount(<MovieCreateForm
      onSubmit={() => {
      }} poster='xc' film='xc' {...functions}
                            />)
    const label = component.find('label').at(3)

    expect(label.text()).toMatch(translate)
  })

  it('should have movie create form "description" with valid helper text', () => {
    const translate = i18n.t('MOVIE_CREATE_DESCRIPTION_HELP_TEXT')
    const component = mount(<MovieCreateForm
      onSubmit={() => {
      }} poster='fr' film='fr' {...functions}
                            />)
    const label = component.find('.MuiFormHelperText-root').at(2)

    expect(label.text()).toMatch(translate)
  })

  it('should have movie create form "bid" with valid label text', () => {
    const translate = i18n.t('MOVIE_CREATE_BID')
    const component = mount(<MovieCreateForm
      onSubmit={() => {
      }} poster='bh' film='bh' {...functions}
                            />)
    const label = component.find('label').at(4)

    expect(label.text()).toMatch(translate)
  })

  it('should have movie create form "bid" with valid helper text', () => {
    const translate = i18n.t('MOVIE_CREATE_BID_HELP_TEXT')
    const component = mount(<MovieCreateForm
      onSubmit={() => {
      }} film='yu' poster='yu' {...functions}
                            />)
    const label = component.find('.MuiFormHelperText-root').at(4)

    expect(label.text()).toMatch(translate)
  })

  it('should have movie create form "trailer" with valid label text', () => {
    const translate = i18n.t('MOVIE_CREATE_TRAILER')
    const component = mount(<MovieCreateForm
      onSubmit={() => {
      }} poster='asd' film='sdas' {...functions}
                            />)
    const label = component.find('label').at(5)

    expect(label.text()).toMatch(translate)
  })

  it('should have movie create form "nft desc" with valid label text', () => {
    const translate = i18n.t('MOVIE_CREATE_NFT_DESC')
    const component = mount(<MovieCreateForm
      onSubmit={() => {
      }} film='dfv' poster='vdf' {...functions}
                            />)
    const label = component.find('label').at(6)

    expect(label.text()).toMatch(translate)
  })

  it('should have movie create form "nft desc" with valid helper text', () => {
    const translate = i18n.t('MOVIE_CREATE_NFT_DESC_HELP_TEXT')
    const component = mount(<MovieCreateForm
      onSubmit={() => {
      }} poster='fer' film='efr' {...functions}
                            />)
    const label = component.find('.MuiFormHelperText-root').at(6)

    expect(label.text()).toMatch(translate)
  })

  it('should have movie create form "button" with valid text', () => {
    const translate = i18n.t('MOVIE_CREATE_ADD_BUTTON')
    const component = mount(<MovieCreateForm
      onSubmit={() => {
      }} poster='' film='' {...functions}
                            />)
    const button = component.find(Button).last()

    expect(button.text()).toMatch(translate)
  })
})
