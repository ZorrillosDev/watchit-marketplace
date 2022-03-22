import { mount, shallow } from 'enzyme'
import AlertState from '@components/AlertState'
import { Alert } from '@mui/material'
import React from 'react'

describe('<AlertState />', () => {
  it('should render', () => {
    const logo = shallow(<AlertState />)
    expect(logo).toMatchSnapshot()
  })

  it('should render corresponding state based on `success=false', () => {
    const props = { result: { success: false } } as any
    const alertStateComponent = mount(<AlertState {...props} />)
    const alertComponent = alertStateComponent.find(Alert)
    expect(alertComponent.props().severity).toBe('error')
  })

  it('should render corresponding state based on `success=true', () => {
    const props = { result: { success: true } } as any
    const alertStateComponent = mount(<AlertState {...props} />)
    const alertComponent = alertStateComponent.find(Alert)
    expect(alertComponent.props().severity).toBe('success')
  })
})
