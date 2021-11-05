// mui imports
import {
  Avatar,
  AvatarGroup,
  Box,
  CardHeader,
  Grid,
  styled,
  Typography,
  IconButton,
  CardMedia,
  CardContent,
  Card,
  CardProps,
  CardHeaderProps,
  CardContentProps,
  Menu,
  MenuItem,
  Tooltip,
  CardActions,
  Button,
  AvatarProps
} from '@mui/material'
import React, { FC } from 'react'
import { MoreHoriz } from '@mui/icons-material'
import { IconEth } from '@components/Icons'
import HeartCounter from '@components/HeartCounter'

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
        height="200"
        image={`${props.coverUrl}`}
        alt={`${props.username}`}
      />
      <CreatorProfileImg src={props.profileUrl} />
      <CreatorContent>
        <Typography gutterBottom variant="h3" color='primary.dark'>
          {props.name}
        </Typography>
        <Typography gutterBottom variant="h4" color='primary.dark' sx={{ opacity: 0.8 }}>
          {props.username}
        </Typography>
        <Typography variant="body2" color="primary">
          {props.biography}
        </Typography>
      </CreatorContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display='flex' flexDirection='column'>
          <Typography gutterBottom variant="h3" color='primary.dark'>
            {props.followers}
          </Typography>
          <Typography gutterBottom variant="h4" color='primary.dark' sx={{ opacity: 0.8 }}>
            Followers
          </Typography>
        </Box>
        <Button
          variant={ props.isFollowing ? 'contained' : 'outlined' }
          size="small" color='primary' sx={{ borderRadius: 3 }}
        >
          { props.isFollowing ? 'Following' : 'Follow'}
        </Button>
      </CardActions>
    </CreatorWrapper>
  )
}

export default Creator

export const CreatorWrapper = styled(Card)<CardProps>(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
  cursor: 'pointer'
}))

export const CreatorContent = styled(CardContent)<CardContentProps>(() => ({
  padding: '0.5rem !important',
  svg: {
    width: '0.9rem',
    height: '0.9rem'
  }
}))

export const CreatorProfileImg = styled(Avatar)<AvatarProps>(() => ({
  position: 'absolute',
  top: 'calc(100px - 2.5rem)',
  left: 'calc(100% - 2.5rem)',
  width: '5rem',
  height: '5rem'
}))
