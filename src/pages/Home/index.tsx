import React, { ReactElement } from 'react'
import { connect, RootStateOrAny } from 'react-redux'
import * as actions from '@state/actions/app'
import { TopHeader } from '@src/components'
import { DefaultLayout } from '@layouts/default'

function Index (): ReactElement {
  return (
    <DefaultLayout>
      <TopHeader />
    </DefaultLayout>
  )
}

export default connect(
  (state: RootStateOrAny) => state.app,
  actions
)(Index)
