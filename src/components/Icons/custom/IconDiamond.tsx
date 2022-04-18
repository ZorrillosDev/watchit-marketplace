// react imports
import React, { FC, ReactElement } from 'react';

// mui imports
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

// ===========================|| CUSTOM ICON DIAMOND ||=========================== //

export const IconDiamond: FC<SvgIconProps> = (props): ReactElement => {
  return (
    <SvgIcon {...props} viewBox='-40 -40 550 550'>
      <path d='m326.309 128.277-39.769-120h-82.175l-39.532 120z' />
      <path d='m88 8.277-88 120h133.248l39.53-120z' />
      <path d='m491.203 128.277-88-120h-85.058l39.769 120z' />
      <path d='m365.07 158.277-73.522 263.709 199.54-263.709z' />
      <path d='m245.602 482.926 87.52-324.078h-176.253z' />
      <path d='m.154 158.277 198.415 262.267-72.436-262.267z' />
    </SvgIcon>
  );
};
