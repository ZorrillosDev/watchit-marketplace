import React, { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styled from 'styled-components'
import SwiperCore, {
  Navigation, Pagination
} from 'swiper'
import { Box, Typography, Avatar, useTheme } from '@material-ui/core'
import { IconEth, Favorite } from '@components/Icons'

SwiperCore.use([Navigation, Pagination])

export interface HomeSlide {
  image: string
  title: string
  description: string
  owner: {
    name: string
    profilePicture: string
  }
  price: number
  rate: number
}

export interface HomeSliderProps {
  slides: HomeSlide[]
}

const HomeSlider: FC<HomeSliderProps> = ({ slides }): JSX.Element => {
  const theme = useTheme()

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
                <Box
                  sx={{
                    position: 'absolute',
                    right: '5%',
                    top: { xs: '5%', lg: '10%' },
                    display: 'flex',
                    flexDirection: 'column',
                    fontWeight: 'bold',
                    maxWidth: { xs: '90%', lg: '35%' },
                    color: theme.palette.primary.dark
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '0.5rem 0.5rem 0 0',
                      bgcolor: 'rgba(255,255,255,0.8)'
                    }}
                  >
                    <Typography variant='h5'>{slide.title}</Typography>
                    <Typography variant='body1'>{slide.description}</Typography>
                  </Box>
                  <Box
                    sx={{
                      py: 2,
                      px: 3,
                      mt: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '0 0 3rem 3rem',
                      bgcolor: 'rgba(255,255,255,0.8)'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Avatar alt='Profile picture' sizes='small' src={slide.owner.profilePicture} />
                      <Box sx={{ ml: 1 }}>
                        <Typography variant='body1'>{slide.owner.name}</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        px: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconEth color='primary' />
                      <Box sx={{ ml: 1 }}>
                        <Typography variant='body1'>{slide.price} ETH</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Favorite color='error' />
                      <Box sx={{ ml: 1 }}>
                        <Typography variant='body1' color='error'>{slide.rate}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <HomeSliderImage image={slide.image} />
              </Box>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </HomeSliderWrapper>
  )
}

const HomeSliderWrapper = styled.div`
  height: 100%;
  max-height: calc(100vh - 3.5rem);
  display: block;
  position: relative;
  width: calc(100% + 2rem);
  margin: 0 0 0 -1rem;

  .swiper {
    height: 100%;
  }
  
  .swiper-button-next, .swiper-button-prev {
    width: 4rem;

    &:after {
      color: #fff;
      font-size: 3rem;
      font-weight: bold;
    }
  }

  .swiper-pagination {
    bottom: 1rem;

    .swiper-pagination-bullet {
      width: 0.7rem;
      height: 0.7rem;
      background-color: white !important;
      transition: all 0.5s ease-in-out;
    }
    
    .swiper-pagination-bullet-active {
      width: 2rem !important;
      border-radius: 0.5rem;
    }
  }

  .MuiAvatar-root {
    width: 30px;
    height: 30px;
  }
  
  svg {
    width: 1rem;
    height: 1rem;
  }
  
  p {
    margin-top: 4px;
  }

  @media (min-width: 600px) {
    width: calc(100% + 3rem);
    margin: 0 0 0 -1.5rem;
  }

  @media (min-width: 1200px) {
    width: calc(100% + 6rem);
    margin: 0 0 0 -3rem;
  }

  @media (min-width: 1400px) {
    width: calc(100% + 10rem);
    margin: 0 0 0 -5rem;
  }

  @media (min-width: 1900px) {
    width: calc(100% + 20rem);
    margin: 0 0 0 -10rem;
    transition: all 0.5s ease-in-out;
  }
`

const HomeSliderImage = styled.div<{image: string}>`
   width: 100%;
   height: 100%;
   background-image: url(${({ image }) => image});
   background-repeat: no-repeat;
   background-position: center;
   background-size: cover;
`

export default HomeSlider
