// react imports
import React, { FC, useEffect, useState } from 'react'

// project imports
import { HomeView } from '@pages/Home/HomeView'
import {PosterProps} from "@components/Poster";

// TODO delete this when data comes from backend
import { FAKE_MOVIES } from "@src/config";

// ===========================|| HOME CONTAINER ||=========================== //

export const HomeContainer: FC = (): JSX.Element => {
  const [slides, setSlides] = useState([] as PosterProps[])

  useEffect((): void => {
    // TODO get main carousel data from backend
    setSlides(FAKE_MOVIES as PosterProps[])
  }, [])

  return (<HomeView {...{ slides }} />)
}
