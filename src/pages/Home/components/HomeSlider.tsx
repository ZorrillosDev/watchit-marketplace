// react imports
import React, { FC } from 'react'

// swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import SwiperCore, {
  Autoplay,
  Navigation, Pagination
} from 'swiper'

// project imports
import {Box, styled, BoxProps, Grid} from '@mui/material'
import HomeSliderCard  from '@pages/Home/components/HomeSliderCard'
import Poster, {PosterProps} from "@components/Poster";

// ===========================|| HOME SLIDER ||=========================== //

SwiperCore.use([Navigation, Pagination, Autoplay])

export interface HomeSliderProps {
  slides: PosterProps[]
}

const HomeSlider: FC<HomeSliderProps> = ({ slides }): JSX.Element => {
  return (
    <HomeSliderWrapper>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        centeredSlides
        autoplay={{
          delay: 5000
        }}
        pagination={{
          clickable: true
        }}
      >
        {
          slides.map((slide) => (
            <SwiperSlide key={slide.posterUrl}>
              <Box width={1} height={1} display="flex" alignItems='center' justifyContent='center'>
                <Grid container alignItems='center' justifyContent='center' zIndex={1}>
                  <Grid item sm={12} md={10} lg={8} xl={6}>
                    <Grid container spacing={3} flexDirection='row-reverse'>
                      <Grid item xs={12} sm={6} display='flex' alignItems='center' justifyContent='center'>
                        <HomeSliderPosterWrapper>
                          <Poster {...slide} showDetails={false} />
                        </HomeSliderPosterWrapper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <HomeSliderCard slide={slide} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <HomeSliderBackground src={slide.posterUrl} />
              </Box>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </HomeSliderWrapper>
  )
}

export const HomeSliderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100%',
  maxHeight: 'calc(60vh - 3.5rem)',
  display: 'block',
  position: 'relative',
  transition: 'all 0.5s ease-in-out',
  '& .swiper-container': {
    height: '100%'
  },
  '& .swiper': {
    height: '100%'
  },
  '& .swiper-button-next, & .swiper-button-prev': {
    width: '4rem',
    '&:after': {
      color: theme.palette.primary.dark,
      fontSize: '3rem',
      fontWeight: 'bold'
    }
  },
  '& .swiper-pagination': {
    bottom: '1rem',
    '& .swiper-pagination-bullet': {
      width: '0.7rem',
      height: '0.7rem',
      backgroundColor: theme.palette.primary.dark,
      transition: 'all 0.5s ease-in-out',
      opacity: 1,
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },
    '& .swiper-pagination-bullet-active': {
      width: '2rem !important',
      borderRadius: '8px'
    }
  },
  '& .MuiAvatar-root': {
    width: '30px',
    height: '30px'
  },
  '& svg': {
    width: '1rem',
    height: '1rem'
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: 'calc(80vh - 2rem)',
    '& .swiper-button-next, & .swiper-button-prev': {
      display: 'none'
    }
  },
}))

export const HomeSliderBackground = styled(Box)<BoxProps & { src: string }>(({  src }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundColor: 'rgb(255, 255, 255)',
  backgroundPosition: 'center center',
  opacity: 0.3,
  filter: 'blur(10px)',
  WebkitMask: 'linear-gradient(rgb(255, 255, 255), transparent)'
}))

export const HomeSliderPosterWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  maxWidth: '10rem',
  '&:hover > div': {
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '15rem',
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: '18rem',
  }
}))

export default HomeSlider
