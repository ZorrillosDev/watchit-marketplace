// REACT IMPORTS
import React, { FC, useRef } from 'react';

// MUI IMPORTS
import { ClickAwayListener, Grid, styled, GridProps } from '@mui/material';

// PROJECT IMPORTS
import SearchResults, { SearchResultsProps } from '@components/Search/SearchResults';
import SearchInput, { SearchInputProps } from '@components/Search/SearchInput';

/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

// ===========================|| SEARCH - VIEW ||=========================== //

export type SearchViewProps = { handleClose: () => void } & SearchInputProps & Omit<SearchResultsProps, 'anchorRef'>;

const SearchView: FC<SearchViewProps> = (props): JSX.Element => {
  const anchorRef = useRef(null);

  return (
    <>
      <ClickAwayListener onClickAway={props.handleClose}>
        {/* Search Input */}
        <SearchWrapper ref={anchorRef}>
          <SearchInput {...props} />
          <SearchResults {...props} anchorRef={anchorRef.current} />
        </SearchWrapper>
      </ClickAwayListener>
    </>
  );
};

const SearchWrapper = styled(Grid)<GridProps>(() => ({
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1000,
  '#search_results': {
    top: 'calc(100% + 2px) !important',
    left: '0 !important',
    width: '100%',
    transform: 'none !important',
    zIndex: 1010,
  },
  '@media (max-width: 600px)': {
    width: 'auto',
    marginLeft: '1rem',
    marginRight: '0.5rem',
    flexGrow: 1,
    maxWidth: 'calc(100% - 7rem)',
  },
  '@media (min-width: 600px)': {
    width: '25%',
    marginRight: 0,
    flexGrow: 1,
  },
  '@media (min-width: 960px)': {
    width: '30%',
    marginLeft: '2rem',
  },
}));

export default SearchView;
