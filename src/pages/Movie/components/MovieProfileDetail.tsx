// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import { Grid, Typography, Link, styled, GridProps } from '@mui/material'

// THIRD PARTY IMPORTS
import { IconCircleCheck } from '@tabler/icons'

// ===========================|| MOVIE - PROFILE - DETAIL ||=========================== //

interface MovieProfileDetailProps {
  text: string | JSX.Element
  link?: {
    href: string
    text: string | JSX.Element
  }
}

const MovieProfileDetail: FC<MovieProfileDetailProps> = (props): JSX.Element => {
  return (
    <MovieProfileDetailWrapper item xs={12} display='flex'>
      <IconCircleCheck />
      <Typography variant='body2' color='text.primary' sx={{ ml: 2, display: 'inline' }}>
        {props.text}
        {
          (props.link != null) &&
            <Link href={props.link.href} sx={{ ml: 1 }}>
              {props.link.text}
            </Link>
        }
      </Typography>
    </MovieProfileDetailWrapper>
  )
}

export default MovieProfileDetail

const MovieProfileDetailWrapper = styled(Grid)<GridProps>(({ theme }) => ({
  svg: {
    color: theme.palette.primary.main,
    flexShrink: 0
  }
}))
