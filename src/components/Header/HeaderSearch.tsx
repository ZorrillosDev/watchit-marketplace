import React, { FC } from 'react'
import { IconButton as IconButtonMui, InputBase, WithTheme, withTheme } from '@material-ui/core'
import { Search as SearchIcon } from '@components/Icons'
import styled from 'styled-components'
import i18n from '@src/i18n'

export interface SearchProps {
  onSearch: (txt: string) => void
}

const Search: FC<SearchProps> = ({ onSearch }): JSX.Element => {
  return (
    <SearchWrapper>
      <IconButton type='submit' aria-label='search'>
        <SearchIcon />
      </IconButton>
      <SearchInput
        placeholder={i18n.t('GLOBAL_SEARCH')}
        onKeyUp={(e: any) => onSearch(e.target.value)}
      />
    </SearchWrapper>
  )
}

export const SearchWrapper = withTheme(
  styled.div<WithTheme>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10rem;
    flex-shrink: 0;
    margin-left: 2rem;
    width: 30%;
    border: 1px solid ${({ theme }) => theme.palette.grey[400]};
    height: 2.5rem;

    @media (max-width: 1440px) {
      width: 25%;
      margin-left: 1rem;
    }
    
    @media (max-width: 959px) {
      width: auto;
      flex-grow: 1;
      margin: 0 0.4rem 0 1rem;
      max-width: calc(100% - 7rem);
    }
  `
)

export const SearchInput = withTheme(
  styled(InputBase)`
    margin-top: 2px;
    padding: 0;
    height: 100%;
    width: 100%;
    
    input {
      height: 100%;
      width: 100%;
      padding: 0;
      line-height: 1;
      font-weight: bold;
      color: ${({ theme }) => theme.palette.grey[600]};
    }
  `
)

const IconButton = withTheme(
  styled(IconButtonMui)`
    padding: 0;
    width: 2.5rem;
    height: 2.5rem;
    
    svg {
      fill: ${({ theme }) => theme.palette.grey[400]};
    }
  `
)

export default Search
