// mui imports
import { Box, styled, Typography, BoxProps } from '@mui/material'
import React, { FC } from 'react'
import { Favorite, FavoriteBorder } from '@components/Icons'

// ===========================|| POSTER ||=========================== //

const HeartCounter: FC<{ count: number, favorite?: boolean }> = ({ count, favorite }): JSX.Element => {
  return (
    <HeartCounterWrapper display='flex' justifyContent='center' alignItems='center' color='primary'>
      {favorite
        ? <Favorite />
        : <FavoriteBorder />}
      <Typography variant='body1' display='inline' fontWeight='bold'>{count}</Typography>
    </HeartCounterWrapper>
  )
}

export default HeartCounter

export const HeartCounterWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  cursor: 'pointer',
  svg: {
    width: '0.9rem',
    height: '0.9rem'
  },
  p: {
    marginLeft: '2px'
  }
}))
