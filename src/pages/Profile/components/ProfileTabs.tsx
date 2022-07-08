// REACT IMPORTS
import React, { FC, useState } from 'react';

// MUI IMPORTS
import { Box, Tabs, Tab, Typography } from '@mui/material';

// PROJECT IMPORTS
import { IconGeometry, IconStack2 } from '@tabler/icons';
import { Movie } from '@state/movies/types';
import ProfilePosters from '@pages/Profile/components/ProfilePosters';
import { TabContext, TabPanel } from '@mui/lab';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| PROFILE - TABS ||=========================== //

interface ProfileTabsProps {
  created: Movie[]
  collected: Movie[]
}

const ProfileTabs: FC<ProfileTabsProps> = (props): JSX.Element => {
  const [value, setValue] = useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label={<ProfileTabLabel title={'Collected'} icon={<IconStack2 />} length={4} />} value={'0'} />
        <Tab label={<ProfileTabLabel title={'Created'} icon={<IconGeometry />} length={8} />} value={'1'} />
      </Tabs>
      <TabPanel value='0'>
        <ProfilePosters posters={props.collected} />
      </TabPanel>
      <TabPanel value='1'>
        <ProfilePosters posters={props.created} />
      </TabPanel>
    </TabContext>
  );
};

const ProfileTabLabel: FC<{ icon: JSX.Element, title: string, length: number }> = (props): JSX.Element => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{ svg: { width: '1rem' } }}>
      { props.icon }
      <Typography variant={'body1'} sx={{ ml: '0.5rem' }} fontWeight={500}>
        { props.title }
      </Typography>
      <Typography variant={'body1'} sx={{ ml: '0.5rem' }} fontWeight={400}>
        { props.length }
      </Typography>
    </Box>
  );
};

export default ProfileTabs;