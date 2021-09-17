import {
  THEME_COLOR_PRIMARY_CONTRAST,
  THEME_COLOR_PRIMARY_DARK,
  THEME_COLOR_PRIMARY_LIGHT,
  THEME_COLOR_PRIMARY_MAIN
} from '@styles/CONSTANTS'

// Global styles can be moved to a separate file for ease of maintenance.
export const globalOverrides = {
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          margin: 0,
          padding: 0,
          height: '100%'
        },
        body: {
          margin: 0,
          padding: 0,
          height: '100%',
          fontSize: '1rem',
          backgroundColor: '#fff'
        }
      }
    }
  }
}

export const typography = {
  typography: {
    fontFamily: [
      'Tamil Sangam MN',
      'Oswald',
      'Arial',
      'sans-serif'
    ].join(','),
    h3: {
      fontWeight: 700,
      lineHeight: 1,
      '@media (min-width: 1900px)': {
        fontSize: '3.5rem'
      }
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1,
      '@media (min-width: 1900px)': {
        fontSize: '2rem'
      }
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1,
      '@media (min-width: 1900px)': {
        fontSize: '2rem'
      }
    },
    body1: {
      lineHeight: 1,
      '@media (min-width: 1900px)': {
        fontSize: '1.3rem'
      }
    },
    body2: {
      lineHeight: 1,
      '@media (min-width: 1900px)': {
        fontSize: '1.2rem'
      }
    },
    button: {
      fontSize: '1rem',
      fontWeight: 700
    }
  }
}

export const defaultTheme = {
  palette: {
    primary: {
      light: THEME_COLOR_PRIMARY_LIGHT,
      main: THEME_COLOR_PRIMARY_MAIN,
      dark: THEME_COLOR_PRIMARY_DARK,
      contrastText: THEME_COLOR_PRIMARY_CONTRAST
    }
  }
}
