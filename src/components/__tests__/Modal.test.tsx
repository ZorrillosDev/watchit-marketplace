import Modal, { ModalHeader } from '@components/Modal'
import { Modal as ModalMui } from '@material-ui/core'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'
import React, { FC } from 'react'

/* eslint-disable no-undef */
describe('<Modal />', () => {
  it('should render', () => {
    const component = shallow(
      <Modal
        title='' onClose={() => {
        }} isOpen={false}
      >
        <>Hi</>
      </Modal>
    )
    expect(component).toMatchSnapshot()
  })

  it('should get displayed with valid `props` and `children`', async () => {
    const ChildComponent: FC = () => <>Hi</>
    const title = 'Hello test'
    const onClose = (): number => 1
    const component = mount(
      <Modal {...{ title, onClose, isOpen: true }}>
        <ChildComponent />
      </Modal>
    )

    expect(component.find(ChildComponent)).toBeDefined()
    expect(component.find(ChildComponent).text()).toEqual('Hi')
    expect(component.find(ModalHeader).text()).toEqual(title)
    expect(component.find(ModalMui).props().open).toEqual(true)

    const onCloseInvoke = await component.find(ModalMui).invoke('onClose')
    expect((onCloseInvoke != null) ? onCloseInvoke({}, 'backdropClick') : onClose()).toEqual(1)
  })

  it('should be non displayed on `close` action', () => {
    const title = 'Hello test'
    const onClose = (): number => 1
    const ChildComponent: FC = () => <>Hi</>
    const component = mount(
      <Modal {...{ title, onClose, isOpen: false }}>
        <ChildComponent />
      </Modal>
    )

    expect(
      component.find(ChildComponent).exists()
    ).toBeFalsy()
  })

  // TODO add tests for styles
  // it('should have copyright text valid theme styles', () => {

  // })
})
