import React, { FC } from 'react'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'

/* eslint-disable  @typescript-eslint/explicit-function-return-type */
export const IconBox: FC<SvgIconProps> = (props): JSX.Element => {
  return (
    <SvgIcon {...props} viewBox='0 0 520 520'>
      <polygon points='279.8,244.8 258.2,257.3 258.2,482 452.7,369.7 452.7,145' />
      <polygon points='315,43.3 240.2,0 40.3,115.4 115.2,158.7' />
      <polygon points='440,115.4 353.8,66.3 154,181.7 165.4,187.6 240.2,230.8 314.6,187.9' />
      <polygon points='138.9,264.3 103.1,245.9 103.1,188.7 29.3,146.2 29.3,369.3 222.4,480.8 222.4,257.7 138.9,209.6' />
    </SvgIcon>
  )
}
/* eslint-enable  @typescript-eslint/explicit-function-return-type */
