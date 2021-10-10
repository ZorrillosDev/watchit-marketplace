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
import { Box, Typography, Avatar, useTheme } from '@mui/material'
import { IconEth, Favorite } from '@components/Icons'

// ===========================|| HOME SLIDER ||=========================== //

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
    <Box
      sx={{
        height: 1,
        maxHeight: 'calc(100vh - 3.5rem)',
        width: { xs: 'calc(100% + 2rem)', sm: 'calc(100% + 3rem)', lg: 'calc(100% + 6rem)', xl: 'calc(100% + 14rem)' },
        display: 'block',
        position: 'relative',
        ml: { xs: -2, sm: -3, lg: -6, xl: -14 },
        transition: 'all 0.5s ease-in-out',
        '& .swiper-container': {
          height: 1
        },
        '& .swiper': {
          height: 1
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
            borderRadius: 1
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
      }}
    >
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
    </Box>
  )
}

export default HomeSlider
