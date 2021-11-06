// REACT IMPORTS
import React, { FC } from 'react'

// THIRD PARTY IMPORTS
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import SwiperCore, {
  Pagination, Autoplay
} from 'swiper'

// MUI IMPORTS
import { Grid, Typography, Container, useMediaQuery, styled, ContainerProps } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// PROJECT IMPORTS
import Poster from '@components/Poster'

// TODO delete this when data comes from backend
import { FAKE_MOVIES } from "@src/config";
import {Color} from "@src/utils";

// ===========================|| HOME - MOST LOVED ||=========================== //

SwiperCore.use([Pagination, Autoplay])

const HomeMostLoved: FC = (): JSX.Element => {
  const theme = useTheme()
  let itemCount = 2
  itemCount = useMediaQuery(theme.breakpoints.up('sm')) ? 3 : itemCount
  itemCount = useMediaQuery(theme.breakpoints.up('md')) ? 4 : itemCount
  itemCount = useMediaQuery(theme.breakpoints.up('lg')) ? 6 : itemCount
  itemCount = useMediaQuery(theme.breakpoints.up('xl')) ? 8 : itemCount

  return (
    <HomeMostLovedWrapper>
      <Grid container alignItems='center' justifyContent='space-between' spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h2' color='primary.light' fontWeight={600} textAlign='center'>
            Most Loved Movies
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Swiper
            slidesPerView={itemCount}
            spaceBetween={16}
            slidesPerGroup={1}
            loop
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true
            }}
          >
            {
              FAKE_MOVIES.map((poster) => (
                <SwiperSlide key={poster.title}>
                  <Poster {...poster} showDetails={false} />
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
    bottom: '0',
    '& .swiper-pagination-bullet': {
      width: '1.5rem',
      height: '1.5rem',
      margin: 0,
      opacity: '1 !important',
      backgroundColor: 'transparent',
      position: 'relative',
      '&:hover::before': {
        backgroundColor: theme.palette.primary.light
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 'calc(50% - 0.2rem)',
        left: 'calc(50% - 0.2rem)',
        width: '0.4rem',
        height: '0.4rem',
        borderRadius: '50%',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: Color.addAlpha(theme.palette.primary.light, 0.4)
      }
    },
    '& .swiper-pagination-bullet-active': {
      '&::before': {
        backgroundColor: theme.palette.primary.light
      },
    }
  }
}))
