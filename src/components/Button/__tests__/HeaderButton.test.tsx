import HeaderButton, { HeaderButtonStyled } from '@components/Button/HeaderButton'
import { shallow } from 'enzyme'
import 'jest-styled-components'
import React from 'react'

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
describe('<HeaderButton />', () => {
  it('should render', () => {
    const component = shallow(<HeaderButton text='test text' mobileText='mobile test text' />)
    expect(component).toMatchSnapshot()
  })

  it('should render header button props text', () => {
    const titleText = 'Test Module'
    const component = shallow(<HeaderButton text={titleText} mobileText='mobile test text' />)

    expect(component.text()).toContain(titleText)
  })

  it('should have header button valid styles', () => {
    const component = shallow(<HeaderButtonStyled />)

    expect(component).toHaveStyleRule('box-shadow', '2px 2px 8px rgba(0,0,0,0.15)')
    expect(component).toHaveStyleRule('padding', '6px 1.5rem')
    expect(component).toHaveStyleRule('padding', '6px 0.5rem', { media: '(max-width: 380px)' })
  })
})
