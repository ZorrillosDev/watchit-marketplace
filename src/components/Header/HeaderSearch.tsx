// react imports
import React, { FC } from 'react'

// project imports
import { Search as SearchIcon } from '@components/Icons'
import i18n from '@src/i18n'

// mui imports
import { Grid, IconButton, InputBase } from '@mui/material'

// ===========================|| HEADER SEARCH ||=========================== //

export interface HeaderSearchProps {
  onSearch: (txt: string) => void
}

const HeaderSearch: FC<HeaderSearchProps> = ({ onSearch }): JSX.Element => {
  return (
    <Grid
      container
      alignItems='center'
      justifyContent='flex-start'
      wrap='nowrap'
      flexShrink={0}
      sx={{
        borderRadius: 3,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        width: { xs: 'auto', md: 0.25, lg: 0.3 },
        height: '2.5rem',
        ml: { xs: 2, lg: 4 },
        mr: { xs: 1, md: 0 },
        flexGrow: { xs: 1, md: 0 },
        maxWidth: { xs: 'calc(100% - 7rem)', md: 'auto' }
      }}
    >
      <IconButton
        sx={{
          p: 0,
          width: '2.5rem',
          height: '2.5rem',
          '& svg': {
            fill: (theme) => theme.palette.grey[400]
          }
        }}
        type='submit'
        aria-label='search'
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{
          mt: '2px',
          p: 0,
          height: 1,
          width: 1,
          color: 'text.secondary',
          '& input': {
            height: 1,
            width: 1,
            p: 0,
            fontWeight: 'bold'
          }
        }}
        placeholder={i18n.t('GLOBAL_SEARCH')}
        onKeyUp={(e: any) => onSearch(e.target.value)}
      />
    </Grid>
  )
}

export default HeaderSearch
