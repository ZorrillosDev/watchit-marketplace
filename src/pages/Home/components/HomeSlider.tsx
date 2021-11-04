// react imports
import React, { FC } from 'react'

// swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import SwiperCore, {
  Navigation, Pagination
} from 'swiper'

// project imports
import { Box, styled, BoxProps } from '@mui/material'
import HomeSliderCard, { HomeSliderCardProps } from '@pages/Home/components/HomeSliderCard'

// ===========================|| HOME SLIDER ||=========================== //

SwiperCore.use([Navigation, Pagination])

export interface HomeSlide extends HomeSliderCardProps {
  image: string
}

export interface HomeSliderProps {
  slides: HomeSlide[]
}

const HomeSlider: FC<HomeSliderProps> = ({ slides }): JSX.Element => {
  return (
    <HomeSliderWrapper>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        centeredSlides
        pagination={{
          clickable: true
        }}
      >
        {
          slides.map((slide) => (
            <SwiperSlide key={slide.image}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  position: 'relative'
                }}
              >
                <HomeSliderCard slide={slide} />
                <Box
                  sx={{
                    width: 1,
                    height: 1,
                    backgroundImage: `url(${slide.image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
                />
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
  maxHeight: 'calc(100vh - 3.5rem)',
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
      color: '#fff',
      fontSize: '3rem',
      fontWeight: 'bold'
    }
  },
  '& .swiper-pagination': {
    bottom: '1rem',
    '& .swiper-pagination-bullet': {
      width: '0.7rem',
      height: '0.7rem',
      backgroundColor: 'white !important',
      transition: 'all 0.5s ease-in-out'
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
  }
  // [theme.breakpoints.up('xs')]: {
  //   marginLeft: theme.spacing(-2),
  //   width: 'calc(100% + 2rem)'
  // },
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(-3),
  //   width: 'calc(100% + 3rem)'
  // },
  // [theme.breakpoints.up('lg')]: {
  //   marginLeft: theme.spacing(-6),
  //   width: 'calc(100% + 6rem)'
  // },
  // [theme.breakpoints.up('xl')]: {
  //   marginLeft: theme.spacing(-14),
  //   width: 'calc(100% + 14rem)'
  // }
}))

export default HomeSlider
