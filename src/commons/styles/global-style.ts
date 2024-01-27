import Raleway from '@/assets/font/Raleway.woff'
import { css } from '@emotion/react'
export const globalStyle = css`
  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src:
      local('Raleway'),
      url(${Raleway}) format('woff');
  }

  * {
    margin: 0;
    padding: 0;
  }
`
