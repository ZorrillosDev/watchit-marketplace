// react imports
import React, { FC } from 'react'

// swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import SwiperCore, {
  Autoplay,
  Navigation
} from 'swiper'

// project imports
import { styled, Grid, Container, ContainerProps, useMediaQuery } from '@mui/material'
import Poster, { PosterProps } from '@components/Poster'
import { useTheme } from '@mui/material/styles'

// ===========================|| HOME SLIDER ||=========================== //

SwiperCore.use([Navigation, Autoplay])

export interface HomeSliderProps {
  slides: PosterProps[]
}

const HomeSlider: FC<HomeSliderProps> = ({ slides }): JSX.Element => {
  const theme = useTheme()
  const movies = new Array(slides.length / 2).fill(0)
  const moviesLength = movies.length
  let sliderColumns = 2
  sliderColumns = useMediaQuery(theme.breakpoints.up('sm')) ? 3 : sliderColumns
  sliderColumns = useMediaQuery(theme.breakpoints.up('md')) ? 4 : sliderColumns
  sliderColumns = useMediaQuery(theme.breakpoints.up('lg')) ? 6 : sliderColumns
  sliderColumns = useMediaQuery(theme.breakpoints.up('xl')) ? 6 : sliderColumns

  return (
    <HomeSliderWrapper>
      <Swiper
        spaceBetween={0}
        slidesPerView={sliderColumns}
        navigation
        autoplay={{
          delay: 5000
        }}
      >
        {
          movies.map((_, i) => {
            return (
              <SwiperSlide key={slides[i].title}>
                <Grid container>
                  <Grid item xs={12}>
                    <Poster {...slides[i]} showDetails={false} />
                  </Grid>
                  <Grid item xs={12}>
                    <Poster {...slides[moviesLength + i]} showDetails={false} />
                  </Grid>
                </Grid>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </HomeSliderWrapper>
  )
}

export const HomeSliderWrapper = styled(Container)<ContainerProps>(({ theme }) => ({
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
    width: '40px',
    height: '40px',
    backgroundColor: theme.palette.background.default,
    padding: '0.5rem',
    borderRadius: '50%',
    border: '1px solid rgba(4, 4, 5, 0.1)',
    '&:after': {
      color: theme.palette.primary.dark,
      fontSize: '1rem',
      fontWeight: 'bold'
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
}))

export default HomeSlider
