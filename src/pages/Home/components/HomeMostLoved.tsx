// REACT IMPORTS
import React, { FC } from 'react'

// THIRD PARTY IMPORTS
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import SwiperCore, {
  Pagination
} from 'swiper'

// MUI IMPORTS
import { Grid, Typography, Container, useMediaQuery, styled, ContainerProps } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// PROJECT IMPORTS
import Poster from '@components/Poster'

// TODO delete this when data comes from backend
import { fakeMovies } from '@pages/Home/components/HomeTrending'

// ===========================|| HOME - TRENDING ||=========================== //

SwiperCore.use([Pagination])

const HomeMostLoved: FC = (): JSX.Element => {
  const theme = useTheme()
  let itemCount = 1
  itemCount = useMediaQuery(theme.breakpoints.up('sm')) ? 3 : itemCount
  itemCount = useMediaQuery(theme.breakpoints.up('md')) ? 4 : itemCount
  itemCount = useMediaQuery(theme.breakpoints.up('lg')) ? 7 : itemCount
  itemCount = useMediaQuery(theme.breakpoints.up('xl')) ? 12 : itemCount

  return (
    <HomeMostLovedWrapper>
      <Grid container alignItems='center' justifyContent='space-between' spacing={3}>
        <Grid item xs={12} md={10} lg={6}>
          <Typography
            variant='h3'
            color='primary.dark'
          >
            MOST LOVED MOVIES
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Swiper
            slidesPerView={itemCount}
            spaceBetween={16}
            slidesPerGroup={1}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            pagination={{
              clickable: true
            }}
          >
            {
              fakeMovies.map((poster) => (
                <SwiperSlide key={poster.title}>
                  <Poster {...poster} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </Grid>
      </Grid>
    </HomeMostLovedWrapper>
  )
}

export default HomeMostLoved

export const HomeMostLovedWrapper = styled(Container)<ContainerProps>(({ theme }) => ({
  overflow: 'hidden',
  '.swiper-container': {
    overflow: 'visible'
  },
  '.swiper-slide': {
    paddingTop: '1rem',
    paddingBottom: '4rem'
  },
  '& .swiper-pagination': {
    bottom: '1rem',
    '& .swiper-pagination-bullet': {
      width: '0.7rem',
      height: '0.7rem',
      backgroundColor: theme.palette.primary.main,
      transition: 'all 0.5s ease-in-out'
    },
    '& .swiper-pagination-bullet-active': {
      width: '2rem !important',
      borderRadius: '8px'
    }
  }
}))
