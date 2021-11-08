// react imports
import React, { FC } from 'react'

// project imports
import HomeSlider, { HomeSliderProps } from '@pages/Home/components/HomeSlider'
import { Box, BoxProps, styled } from '@mui/material'
import HomeRecent from '@pages/Home/components/HomeRecent'
import HomeCreators from '@pages/Home/components/HomeCreators'
import Footer from '@components/Footer'

// ===========================|| HOME - VIEW ||=========================== //

export const HomeView: FC<HomeSliderProps> = (props): JSX.Element => {
  return (
    <>
      <HomeSection sx={{ backgroundColor: (theme) => theme.palette.primary.light }}>
        <HomeSlider {...props} />
      </HomeSection>
      <HomeSection>
        <HomeRecent />
      </HomeSection>
      <HomeSection sx={{ backgroundColor: (theme) => theme.palette.primary.light }}>
        <HomeCreators />
      </HomeSection>
      <Footer />
    </>
  )
}

export const HomeSection = styled(Box)<BoxProps>(({ theme }) => ({
  paddingTop: '60px',
  paddingBottom: '60px',
  '&:first-of-type': {
    paddingTop: '60px',
    paddingBottom: '60px'
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: '60px',
    paddingBottom: '60px'
  }
}))
