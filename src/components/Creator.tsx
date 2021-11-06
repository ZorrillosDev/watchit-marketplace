// mui imports
import {
  Avatar,
  Box,
  styled,
  Typography,
  CardMedia,
  CardContent,
  Card,
  CardProps,
  CardContentProps,
  CardActions,
  Button,
  AvatarProps, Divider
} from '@mui/material'
import React, { FC } from 'react'
import TruncatedTypography from '@components/TruncatedTypography'

// ===========================|| POSTER ||=========================== //

interface CreatorProps {
  name: string
  username: string
  profileUrl: string
  coverUrl: string
  biography: string
  followers: number
  isFollowing: boolean
}

const Creator: FC<CreatorProps> = (props): JSX.Element => {
  return (
    <CreatorWrapper>
      <CardMedia
        component='img'
        height='200'
        image={`${props.coverUrl}`}
        alt={`${props.username}`}
      />
      <CreatorProfileImg src={props.profileUrl} />
      <CreatorContent>
        <Typography gutterBottom variant='h3' color='primary.dark'>
          {props.name}
        </Typography>
        <Typography gutterBottom variant='h4' color='primary.dark' sx={{ opacity: 0.5 }}>
          {props.username}
        </Typography>
        <TruncatedTypography variant='body2' color='primary' lines={3}>
          {props.biography}
        </TruncatedTypography>
      </CreatorContent>
      <Divider />
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display='flex' flexDirection='column'>
          <Typography gutterBottom variant='h3' color='primary.dark'>
            {props.followers}
          </Typography>
          <Typography gutterBottom variant='h4' color='primary.dark' sx={{ opacity: 0.8 }}>
            Followers
          </Typography>
        </Box>
        <Button
          variant={props.isFollowing ? 'contained' : 'outlined'}
          size='large' color='primary' sx={{ borderRadius: '3rem !important' }}
        >
          {props.isFollowing ? 'Following' : 'Follow'}
        </Button>
      </CardActions>
    </CreatorWrapper>
  )
}

export default Creator

export const CreatorWrapper = styled(Card)<CardProps>(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
  cursor: 'pointer'
}))

export const CreatorContent = styled(CardContent)<CardContentProps>(() => ({
  paddingTop: '3.5rem',
  svg: {
    width: '0.9rem',
    height: '0.9rem'
  }
}))

export const CreatorProfileImg = styled(Avatar)<AvatarProps>(({ theme }) => ({
  position: 'absolute',
  top: 'calc(200px - 3rem)',
  left: 'calc(50% - 3rem)',
  border: `2px solid ${theme.palette.background.paper}`,
  width: '6rem',
  height: '6rem',
  boxShadow: '0 3px 10px rgba(0,0,0,0.25)'
}))
