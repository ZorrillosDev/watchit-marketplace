import React, { FC, ReactElement } from 'react'
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon'

/* eslint-disable  @typescript-eslint/explicit-function-return-type */
export const IconEth: FC<SvgIconProps> = (props): ReactElement => {
  return (
    <SvgIcon {...props} viewBox='0 0 9.921 16.911'>
      <path
        id='Icon_awesome-ethereum' data-name='Icon awesome-ethereum'
        d='M10.48,8.614,5.523,11.679.563,8.614,5.523,0ZM5.523,12.663.563,9.6l4.96,7.313L10.483,9.6Z'
        transform='translate(-0.563)' fill='#164c5d'
      />
    </SvgIcon>
  )
}
/* eslint-enable  @typescript-eslint/explicit-function-return-type */
