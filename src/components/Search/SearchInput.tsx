// REACT IMPORTS
import React, { FC, useState } from 'react';

// MUI IMPORTS
import { Box, BoxProps, Grid, GridProps, InputBase, InputBaseProps, styled } from '@mui/material';

// PROJECT IMPORTS
import { IconX } from '@tabler/icons';
import { Search as SearchIcon } from '@mui/icons-material';
import i18n from '@src/i18n';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| NOTIFICATIONS - ITEM ||=========================== //

export interface SearchInputProps {
  handleCancel: () => void
  onSearch: (txt: string) => void
}

const SearchInput: FC<SearchInputProps> = (props): JSX.Element => {
  const [text, setText] = useState('');

  const handleChange = (e: any): void => {
    setText(e.target.value);
    props.onSearch(e.target.value);
  };

  const handleCancel = (): void => {
    setText('');
    props.handleCancel();
  };

  return (
    <SearchInputWrapper container>
      <SearchIconWrapper filled={!!text}>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchTextField
        placeholder={i18n.t('GLOBAL_SEARCH')}
        value={text}
        onFocus={() => props.onSearch(text)}
        onChange={handleChange}
      />
      {
        text
          ? (
            <SearchCancel onClick={handleCancel}>
              <IconX />
            </SearchCancel>
          )
          : <></>
      }
    </SearchInputWrapper>
  );
};

const SearchInputWrapper = styled(Grid)<GridProps>(() => ({
  borderRadius: '10px',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'flex-start',
  border: '1px solid rgb(229, 232, 235)',
  height: '2.5rem',
  width: '100%',
  zIndex: 1005,
}));

const SearchIconWrapper = styled(Box)<BoxProps & { filled: boolean }>(({ theme, filled }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  '& svg': {
    fill: filled ? theme.palette.primary.main : theme.palette.grey[400],
  },
}));

const SearchCancel = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  cursor: 'pointer',
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  '& svg': {
    fill: theme.palette.primary.main,
    color: theme.palette.primary.main,
    width: '1.2rem',
    height: '1.2rem',
  },
}));

const SearchTextField = styled(InputBase)<InputBaseProps>(({ theme }) => ({
  marginTop: '2px',
  padding: 0,
  height: '100%',
  width: '100%',
  color: theme.palette.primary.main,
  '& input': {
    height: '100%',
    width: '100%',
    padding: '0 2.5rem 0 2.5rem !important',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
}));

export default SearchInput;
