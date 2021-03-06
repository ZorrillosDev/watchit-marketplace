// REACT IMPORTS
import React, { ReactElement, forwardRef } from 'react';

// MUI IMPORTS
import { Card, CardContent, CardHeader, CardProps, Divider, Theme, useTheme } from '@mui/material';
import { SxProps } from '@mui/system';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */
/* eslint-disable  react/display-name */

// ===========================|| CARD - MAIN ||=========================== //

export interface MainCardProps extends Omit<CardProps, 'title'> {
  border?: boolean
  boxShadow?: boolean
  content?: boolean
  contentSx?: SxProps<Theme>
  secondary?: React.ReactNode | string
  shadow?: string
  sx?: SxProps<Theme>
  title?: ReactElement | string
}

export const MainCard = forwardRef<HTMLDivElement, MainCardProps>((props, ref) => {
  const theme = useTheme();
  const { border, content, contentSx, boxShadow, title, ...p } = props;

  return (
    <Card
      {...p}
      ref={ref}
      sx={{
        border: border ? '1px solid' : 'none',
        borderColor: theme.palette.primary.light,
        ':hover': {
          boxShadow: boxShadow ? p.shadow ?? '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
        },
        ...p.sx,
      }}
    >
      {/* card header and action */}
      {
        title && <CardHeader
          sx={{ p: 2, '& .MuiCardHeader-action': { mr: 0 } }}
          title={title}
          action={p.secondary}
                 />
      }

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && (
        <CardContent sx={contentSx}>
          {p.children}
        </CardContent>
      )}
      {!content && p.children}
    </Card>
  );
});

export default MainCard;
