import React, {ReactElement} from 'react'
import {connect, RootStateOrAny} from 'react-redux'
import * as actions from '@state/actions/app'
import {TopHeader, MainSlider} from '@src/components'
import {DefaultLayout} from '@layouts/default'

function Index(): ReactElement {
    return (
        <DefaultLayout>
            <TopHeader/>
            <MainSlider/>
        </DefaultLayout>
    )
}

export default connect(
    (state: RootStateOrAny) => state.app,
    actions
)(Index)
