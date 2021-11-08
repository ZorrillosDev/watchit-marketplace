// react imports
import React, { FC, useEffect, useState } from 'react'

// project imports
import { HomeView } from '@pages/Home/HomeView'
import { HomeRecentPosterProps } from '@pages/Home/components/HomeRecentPoster'

// TODO delete this when data comes from backend
import { FAKE_MOVIES } from '@src/config'

// ===========================|| HOME CONTAINER ||=========================== //

export const HomeContainer: FC = (): JSX.Element => {
  const [slides, setSlides] = useState([] as HomeRecentPosterProps[])

  useEffect((): void => {
    // TODO get main carousel data from backend
    setSlides(FAKE_MOVIES as HomeRecentPosterProps[])
  }, [])

  return (<HomeView {...{ slides }} />)
}
