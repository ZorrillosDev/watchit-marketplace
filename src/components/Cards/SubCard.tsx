// REACT IMPORTS
import React, { FC, PropsWithChildren } from 'react';

// MUI IMPORTS
import { Card, CardContent, CardHeader, CardProps, Divider, Theme, Typography, useTheme } from '@mui/material';
import { SxProps } from '@mui/system';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| CARD - SUB ||=========================== //

interface SubCardProps {
  content?: boolean
  secondary?: React.ReactNode | string
  sx?: SxProps<Theme>
  contentSx?: SxProps<Theme>
  title?: React.ReactNode | string
}

const SubCard: FC<PropsWithChildren<SubCardProps & CardProps>> = ({ sx, content, contentSx, ...props }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        border: '1px solid',
        borderColor: theme.palette.primary.light,
        '&:hover': {
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
        },
        ...sx,
      }}
      {...props}
    >
      {/* card header and action */}
      {props.title && (
        <CardHeader
          sx={{ p: 2 }} action={props.secondary}
          title={<Typography variant='h5'>{props.title}</Typography>}
        />
      )}

      {/* content & header divider */}
      {props.title && (
        <Divider
          sx={{
            opacity: 1,
            borderColor: theme.palette.primary.light,
          }}
        />
      )}

      {/* card content */}
      {content && (
        <CardContent sx={{ p: 2.5, ...contentSx }}>
          {props.children}
        </CardContent>
      )}
      {!content && props.children}
    </Card>
  );
};

SubCard.defaultProps = {
  content: true,
};

export default SubCard;
