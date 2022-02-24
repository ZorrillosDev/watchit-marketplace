import React from 'react'
import {mount, shallow} from 'enzyme'
import MovieProfilePrice from '@pages/Movie/components/MovieProfilePrice'
import i18n from '@src/i18n'
import {Typography} from '@mui/material'
import {Movie} from '@state/movies/types'
import {store} from '@state/store'
import {Provider} from 'react-redux'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

describe('<MovieProfilePrice />', () => {
  const movie = {
    creator: '0xEe99CeFF640d37Edd9cac8c7cfF4Ed4cD609f435',
    token: '651268735865169554630764440897259763067310892845464250243992889613221274545'
  } as Movie
  it('should render', () => {
    const component = shallow(
        <Provider store={store}>
          <MovieProfilePrice {...movie} />
        </Provider>
    )
    expect(component).toMatchSnapshot()
  })

  it('should have movie profile price valid higher price text', () => {
    const translate = i18n.t('MOVIE_PROFILE_PRICE_HIGHER')
    const component = mount(
        <Provider store={store}>
          <MovieProfilePrice {...movie} />
        </Provider>
    )
    const typography = component.find(Typography).at(0)

    expect(typography.text()).toContain(translate)
  })

  it('should have movie profile price valid price text', () => {
    const price = 0
    const component = mount(
        <Provider store={store}>
          <MovieProfilePrice {...movie} price={price}/>
        </Provider>
    )
    const typography = component.find(Typography).at(1)

    expect(typography.text()).toContain(`${price} ETH`)
  })

  it('should have movie profile price valid owner text', () => {
    const translate = i18n.t('MOVIE_PROFILE_OWNER')
    const component = mount(
        <Provider store={store}>
          <MovieProfilePrice {...movie} />
        </Provider>
    )
    const typography = component.find(Typography).at(3)

    expect(typography.text()).toContain(translate)
  })
})
