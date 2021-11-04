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
import {Grid, Typography, Container, useMediaQuery, styled, Box, BoxProps, ContainerProps} from '@mui/material'
import {useTheme} from "@mui/material/styles";

// PROJECT IMPORTS
import Poster from '@components/Poster'

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

// TODO delete this when data comes from backend
const fakeMovies = [
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/1.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/11/cagefighter-worlds-collide-50877-poster-200x300.jpg',
    value: 1.8,
    title: 'Cagefighter: Worlds Collide',
    favoriteCount: 20,
    isFavorite: false
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/3.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/11/los-conductos-50873-poster-200x300.jpg',
    value: 1.8,
    title: 'Los conductos',
    favoriteCount: 20,
    isFavorite: true
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/1.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/3.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/09/envidia-sana-48552-poster-210x300.jpg',
    value: 1.8,
    title: 'Envidia sana',
    favoriteCount: 20,
    isFavorite: false
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/1.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/11/the-eyes-of-tammy-faye-50857-poster-200x300.jpg',
    value: 1.8,
    title: 'The Eyes of Tammy Faye',
    favoriteCount: 20,
    isFavorite: true
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/1.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/11/la-novena-profecia-50825-poster-211x300.jpg',
    value: 2.4,
    title: 'La novena profecía',
    favoriteCount: 23,
    isFavorite: true
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/1.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/4.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/11/dont-look-there-50829-poster-200x300.jpg',
    value: 1.8,
    title: 'Don’t Look There',
    favoriteCount: 20,
    isFavorite: false
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/1.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/11/help-50817-poster-200x300.jpg',
    value: 1.8,
    title: 'Help',
    favoriteCount: 20,
    isFavorite: false
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/1.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/08/safer-at-home-46847-poster-200x300.jpg',
    value: 1.8,
    title: 'Safer at Home',
    favoriteCount: 20,
    isFavorite: true
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/4.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/11/13-minutes-50881-poster-200x300.jpg',
    value: 1.8,
    title: '13 Minutes',
    favoriteCount: 20,
    isFavorite: false
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/3.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/11/angels-fallen-50832-poster-201x300.jpg',
    value: 1.8,
    title: 'Angels Fallen',
    favoriteCount: 20,
    isFavorite: false
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/1.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/11/snakehead-50794-poster-200x300.jpg',
    value: 1.8,
    title: 'Snakehead',
    favoriteCount: 20,
    isFavorite: true
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/1.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/11/the-grizzlies-50786-poster-200x300.jpg',
    value: 1.8,
    title: 'The Grizzlies',
    favoriteCount: 20,
    isFavorite: false
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/4.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/11/the-wonderful-stories-from-the-space-station-50790-poster-200x300.jpg',
    value: 1.8,
    title: 'The Wonderful: Stories from the Space Station',
    favoriteCount: 20,
    isFavorite: true
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/3.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/11/cancion-de-cuna-para-una-madre-50885-poster-200x300.jpg',
    value: 1.8,
    title: 'Canción de cuna para una madre',
    favoriteCount: 20,
    isFavorite: false
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/5.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/10/la-casa-de-las-profundidades-50589-poster-200x300.jpg',
    value: 1.8,
    title: 'La casa de las profundidades',
    favoriteCount: 20,
    isFavorite: false
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/3.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/2.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/10/alive-50579-poster-200x300.jpg',
    value: 1.8,
    title: 'Alive',
    favoriteCount: 20,
    isFavorite: false
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/1.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/5.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2019/05/clara-15424-poster-200x300.jpg',
    value: 1.8,
    title: 'Clara',
    favoriteCount: 20,
    isFavorite: true
  },
  {
    creator: {
      username: '@gmena',
      profileUrl: 'https://mui.com/static/images/avatar/1.jpg'
    },
    owner: {
      username: '@jadapema',
      profileUrl: 'https://mui.com/static/images/avatar/4.jpg'
    },
    posterUrl: 'https://cuevana3.io/wp-content/uploads/2021/10/este-nino-es-un-trasto-50575-poster-200x300.jpg',
    value: 1.8,
    title: 'Este niño es un trasto',
    favoriteCount: 20,
    isFavorite: false
  }
]
