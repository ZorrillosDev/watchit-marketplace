import React, {ReactElement} from 'react'
import {TopHeader, MainSlider} from '@src/components'
import {DefaultLayout} from '@layouts/default'

function Home(): ReactElement {
    return (
        <DefaultLayout>
            <TopHeader/>
            <MainSlider/>
        </DefaultLayout>
    )
}

export default Home;
