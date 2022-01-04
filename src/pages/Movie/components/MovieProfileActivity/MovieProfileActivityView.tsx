// REACT IMPORTS
import React, { FC } from 'react'

// MUI IMPORTS
import {
  Grid, styled, Tab, TabProps
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

// PROJECT IMPORTS
import MovieProfileActivityTable, { MovieProfileActivityTableProps } from '@pages/Movie/components/MovieProfileActivityTable'
import MovieProfileDetail from '@pages/Movie/components/MovieProfileDetail'
import { Translation } from '@src/i18n'

// ===========================|| MOVIE - PROFILE - ACTIVITY - VIEW ||=========================== //

export const MovieProfileActivityView: FC<MovieProfileActivityTableProps> = (props): JSX.Element => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
    setValue(newValue)
  }

  return (
    <Grid item xs={12} sx={{ mb: 6 }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} centered>
          <MovieProfileTab label={<Translation target='MOVIE_PROFILE_MARKET_ACTIVITY' />} value='1' />
          <MovieProfileTab label={<Translation target='MOVIE_PROFILE_ADDITIONAL_DETAILS' />} value='2' />
        </TabList>
        <TabPanel value='1' sx={{ px: 0 }}>
          <MovieProfileActivityTable {...props} />
        </TabPanel>
        <TabPanel value='2' sx={{ px: 0 }}>
          <Grid container spacing={2}>
            {/* Todo add details here, these are for example */}
            <MovieProfileDetail text='3840 x 2160 px (4K)' />
            <MovieProfileDetail
              text={<Translation target='MOVIE_PROFILE_ADDITIONAL_DETAIL_1' />}
              link={{ href: '#', text: <Translation target='MOVIE_PROFILE_ADDITIONAL_DETAIL_1_LINK' /> }}
            />
          </Grid>
        </TabPanel>
      </TabContext>
    </Grid>
  )
}

const MovieProfileTab = styled(Tab)<TabProps>(() => ({
  fontWeight: 400,
  color: 'text.secondary',
  fontSize: '1rem',
  '&.Mui-selected': {
    fontWeight: 600
  }
}))
