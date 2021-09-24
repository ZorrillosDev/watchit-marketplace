import React, { FC } from 'react'
import HomeSlider, { HomeSliderProps } from '@pages/Home/components/HomeSlider'

export const HomeView: FC<HomeSliderProps> = (props): JSX.Element => {
  return (
    <>
      <HomeSlider {...props} />
    </>
  )
}
