// REACT IMPORTS
import React, { FC, useState } from 'react'

// MUI IMPORTS
import { Container, Grid, styled, Typography, GridProps, useMediaQuery } from '@mui/material'

// PROJECT IMPORTS
import MovieCreateForm from '@pages/Create/components/MovieCreateForm'
import MovieCreatePreview from '@pages/Create/components/MovieCreatePreview'
import { useTheme } from '@mui/material/styles'
import Footer from '@components/Footer'
import { Translation } from '@src/i18n'

// ===========================|| MOVIE - CREATE - VIEW ||=========================== //

export interface MovieCreateViewProps {
  onSubmit: (e: any) => void
  progress?: number
}

export const MovieCreateView: FC<MovieCreateViewProps> = (props): JSX.Element => {
  const theme = useTheme()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [poster, setPoster] = useState('')
  const [film, setFilm] = useState('')
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Allow set a "bridge" between sibling components
  const createFormProps = {
    price,
    setPrice,
    poster,
    setPoster,
    film,
    setFilm,
    title,
    setTitle,
    ...props
  }

  return (
    <>
      <Container sx={{ maxWidth: '1000px !important', mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h3' color='primary'>
              <Translation target='MOVIE_CREATE_MINT' />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={isMobile ? 2 : 6}>
              <Grid item xs={12} sm={7}>
                <MovieCreateForm {...createFormProps} />
              </Grid>
              <Grid item xs={12} sm={5}>
                <MovieCreateStickyElement container spacing={3}>
                  <Grid item xs={12}>
                    <Typography
                      variant='h5' color='text.primary' fontWeight={600}
                      sx={{ mt: 2, mb: -2 }}
                    >
                      <Translation target='MOVIE_CREATE_PREVIEW' />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <MovieCreatePreview
                      title={title}
                      poster={poster}
                      bid={price}
                    />
                  </Grid>
                </MovieCreateStickyElement>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

const MovieCreateStickyElement = styled(Grid)<GridProps>(({ theme }) => ({
  width: '100%',
  position: 'sticky',
  top: '50px'
}))
