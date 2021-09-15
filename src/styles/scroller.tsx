import { css } from 'styled-components'

export default css`
  margin-right: 0.5rem !important;
  
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.4rem;
    padding-right: 0.5rem;
    background-color: white;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  &::-webkit-scrollbar-button, &::-webkit-scrollbar-corner, &::-webkit-resizer {
    display: none;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 0.25rem;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
`
