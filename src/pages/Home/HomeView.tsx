// react imports
import React, { FC } from 'react'

// project imports
import HomeSlider, { HomeSliderProps } from '@pages/Home/components/HomeSlider'

// ===========================|| HOME VIEW ||=========================== //

export const HomeView: FC<HomeSliderProps> = (props): JSX.Element => {
  return (
    <>
      <HomeSlider {...props} />
    </>
  )
}
