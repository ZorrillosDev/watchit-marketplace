// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Grid, Typography, Container } from '@mui/material'
import Creator from '@components/Creator'

// ===========================|| HOME - TRENDING ||=========================== //

const HomeCreators: FC = (): JSX.Element => {
  return (
    <Container>
      <Grid spacing={6} container alignItems='center' justifyContent='space-between'>
        <Grid item xs={12} md={10} lg={6}>
          <Typography
            color='primary.dark'
            variant='h3'
          >
            FEATURED CREATORS
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {
              fakeCreators.map((creator) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={creator.username}>
                    <Creator {...creator} />
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HomeCreators

// TODO delete this when data comes from backend
const fakeCreators = [
  {
    name: 'Tyler Givens',
    username: '@ty1000rd',
    profileUrl: 'https://mui.com/static/images/avatar/1.jpg',
    coverUrl: 'https://images.unsplash.com/photo-1542500186-6edb30855637?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    biography: 'Multidisciplinary artist based in NYC whose images and stories often engages with sex, escapism, and the end of the Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    followers: 2014,
    isFollowing: true
  },
  {
    name: 'Chuck D',
    username: '@ChuckD',
    profileUrl: 'https://mui.com/static/images/avatar/2.jpg',
    coverUrl: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mzh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    biography: 'Chuck D is one of the architects of hip hop; politicizing music to speak truth to power. His art’s personal; it can be Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    followers: 4030,
    isFollowing: false
  },
  {
    name: 'Diana Sinclair',
    username: '@dianaesinclair',
    profileUrl: 'https://mui.com/static/images/avatar/3.jpg',
    coverUrl: 'https://images.unsplash.com/photo-1542704504091-49b394c14bb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    biography: 'Diana Sinclair is a 17-year-old internationally awarded visual artist, activist, and curator. Their artwork Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    followers: 1040,
    isFollowing: false
  },
  {
    name: 'Shavonne Wong',
    username: '@shavonnewong',
    profileUrl: 'https://mui.com/static/images/avatar/4.jpg',
    coverUrl: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NjJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    biography: 'Fashion and Advertising photographer turn 3D virtual model creator!',
    followers: 3410,
    isFollowing: true
  },
  {
    name: 'Jae',
    username: '@jaepsd',
    profileUrl: 'https://mui.com/static/images/avatar/5.jpg',
    coverUrl: 'https://images.unsplash.com/photo-1542909588-66492252c919?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NzN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    biography: 'Hi, my name is Ludrick J. Fortune or Jae. I’m a designer based in St. Louis, MO that loves designing more than anything Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    followers: 1023,
    isFollowing: false
  },
  {
    name: 'Kennedy Yanko',
    username: '@kennedyyanko',
    profileUrl: 'https://mui.com/static/images/avatar/6.jpg',
    coverUrl: 'https://images.unsplash.com/photo-1543218241-f5f4e1cbf4e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    biography: 'Kennedy Yanko is an artist working in found metal and paint skin. Her methods reflect a dual abstract expressionist-surr Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    followers: 1041,
    isFollowing: false
  },
  {
    name: 'Serwah Attafuah',
    username: '@serwah',
    profileUrl: 'https://mui.com/static/images/avatar/7.jpg',
    coverUrl: 'https://images.unsplash.com/photo-1543071297-0e73e9813c3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OTd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    biography: 'Serwah Attafuah is a 3D artist and musician from West Sydney. She creates dreamlike cyber wastelands reminiscent  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    followers: 1223,
    isFollowing: true
  },
  {
    name: 'Ayesha Kazim',
    username: '@ayeshachasm',
    profileUrl: 'https://mui.com/static/images/avatar/8.jpg',
    coverUrl: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTMyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60',
    biography: 'South African photographic artist working between New York and Cape Town. My work centers and explores identity Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    followers: 923,
    isFollowing: false
  }
]
