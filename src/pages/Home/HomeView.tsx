// react imports
import React, { FC } from 'react'

// project imports
import HomeSlider, { HomeSliderProps } from '@pages/Home/components/HomeSlider'
import { Box, BoxProps, styled } from '@mui/material'
import HomeTrending from '@pages/Home/components/HomeTrending'
import HomeMostLoved from "@pages/Home/components/HomeMostLoved";

// ===========================|| HOME - VIEW ||=========================== //

export const HomeView: FC<HomeSliderProps> = (props): JSX.Element => {
  return (
    <>
      <HomeSlider {...props} />
      <HomeSection>
        <HomeTrending />
      </HomeSection>
      <HomeSection>
        <HomeMostLoved />
      </HomeSection>
      <HomeSection></HomeSection>
      <HomeSection></HomeSection>
    </>
  )
}

export const HomeSection = styled(Box)<BoxProps>(({ theme }) => ({
  paddingTop: '120px',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '60px',
    '&:first-of-type': {
      paddingTop: '42px'
    }
  }
}))
