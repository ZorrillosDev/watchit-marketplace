// react imports
import React, { FC } from 'react'

// project imports
import HomeSlider, { HomeSliderProps } from '@pages/Home/components/HomeSlider'
import { Box, BoxProps, darken, styled } from '@mui/material'
import HomeTrending from '@pages/Home/components/HomeTrending'
import HomeMostLoved from '@pages/Home/components/HomeMostLoved'
import HomeCreators from '@pages/Home/components/HomeCreators'
import Footer from '@components/Footer'

// ===========================|| HOME - VIEW ||=========================== //

export const HomeView: FC<HomeSliderProps> = (props): JSX.Element => {
  return (
    <>
      <HomeSlider {...props} />
      <HomeSection>
        <HomeTrending />
      </HomeSection>
      <HomeSection
        sx={{
          backgroundColor: (theme) => Object.is(theme.palette.mode, 'light')
            ? darken(theme.palette.primary.dark, 0.6)
            : darken(theme.palette.background.default, 0.6)
        }}
      >
        <HomeMostLoved />
      </HomeSection>
      <HomeSection>
        <HomeCreators />
      </HomeSection>
      <Footer />
    </>
  )
}

export const HomeSection = styled(Box)<BoxProps>(({ theme }) => ({
  paddingTop: '120px',
  paddingBottom: '120px',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '60px',
    paddingBottom: '60px'
  }
}))
