// Global styles can be moved to a separate file for ease of maintenance.
// Need test to be sure that all this settings keep as are defined
import {
  THEME_BACKGROUND_DEFAULT,
  THEME_BACKGROUND_PAPER,
  THEME_COLOR_PRIMARY_MAIN,
  THEME_COLOR_SECONDARY_MAIN,
  THEME_COLOR_SUCCESS_MAIN,
  THEME_COLOR_WARNING_MAIN,
  THEME_COLOR_ERROR_MAIN,
  THEME_DARK_DIVIDER,
  THEME_SHAPE_BORDER_RADIUS,
  THEME_DARK_BACKGROUND_DEFAULT,
  THEME_DARK_BACKGROUND_PAPER,
  THEME_DARK_COLOR_PRIMARY_MAIN,
  THEME_DARK_TEXT_PRIMARY,
  THEME_DARK_TEXT_SECONDARY,
  THEME_DARK_ACTION_ACTIVE,
  THEME_DARK_ACTION_HOVER,
  THEME_DARK_ACTION_HOVER_OPACITY,
  THEME_DARK_ACTION_SELECTED,
  THEME_DARK_ACTION_SELECTED_OPACITY,
  THEME_DARK_ACTION_DISABLED,
  THEME_DARK_ACTION_DISABLED_BACKGROUND,
  THEME_DARK_ACTION_DISABLED_OPACITY,
  THEME_DARK_ACTION_FOCUS,
  THEME_DARK_ACTION_FOCUS_OPACITY,
  THEME_DARK_ACTION_ACTIVATED_OPACITY
} from '@styles/CONSTANTS'
import React from 'react'
import { ComponentsOverrides, PaletteMode } from '@mui/material'

/* eslint-disable  @typescript-eslint/consistent-type-assertions */

export const globalOverrides = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          margin: 0,
          padding: 0,
          height: '100%'
        } as ComponentsOverrides['MuiCssBaseline'],
        body: {
          margin: 0,
          padding: 0,
          height: '100%'
        } as ComponentsOverrides['MuiCssBaseline'],
        '#root': {
          margin: 0,
          padding: 0,
          height: '100%'
        } as ComponentsOverrides['MuiCssBaseline']
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          textTransform: 'none !important'
        } as ComponentsOverrides['MuiButtonBase']
      }
    }
  }
}

export const typography = {
  typography: {
    fontFamily: '\'Roboto\', sans-serif',
    h6: {
      fontWeight: 500,
      fontSize: '0.75rem'
    },
    h5: {
      fontSize: '0.875rem',
      fontWeight: 500
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700
    },
    h1: {
      fontSize: '2.125rem',
      fontWeight: 700
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334em'
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em'
    },
    commonAvatar: {
      cursor: 'pointer',
      borderRadius: '8px'
    },
    smallAvatar: {
      width: '22px',
      height: '22px',
      fontSize: '1rem'
    },
    mediumAvatar: {
      width: '34px',
      height: '34px',
      fontSize: '1.2rem'
    },
    largeAvatar: {
      width: '44px',
      height: '44px',
      fontSize: '1.5rem'
    }
  }
}

export const defaultTheme = Object.assign({}, globalOverrides, typography,
  {
    palette: {
      mode: 'light' as PaletteMode,
      primary: {
        main: THEME_COLOR_PRIMARY_MAIN
      },
      secondary: {
        main: THEME_COLOR_SECONDARY_MAIN
      },
      warning: {
        main: THEME_COLOR_WARNING_MAIN
      },
      success: {
        main: THEME_COLOR_SUCCESS_MAIN
      },
      error: {
        main: THEME_COLOR_ERROR_MAIN
      },
      background: {
        default: THEME_BACKGROUND_DEFAULT,
        paper: THEME_BACKGROUND_PAPER
      }
    },
    shape: {
      borderRadius: THEME_SHAPE_BORDER_RADIUS
    }
  }
)

export const darkTheme = Object.assign({}, typography,
  {
    palette: {
      mode: 'dark' as PaletteMode,
      primary: {
        main: THEME_DARK_COLOR_PRIMARY_MAIN
      },
      secondary: {
        main: THEME_COLOR_SECONDARY_MAIN
      },
      warning: {
        main: THEME_COLOR_WARNING_MAIN
      },
      success: {
        main: THEME_COLOR_SUCCESS_MAIN
      },
      error: {
        main: THEME_COLOR_ERROR_MAIN
      },
      background: {
        default: THEME_DARK_BACKGROUND_DEFAULT,
        paper: THEME_DARK_BACKGROUND_PAPER
      },
      text: {
        primary: THEME_DARK_TEXT_PRIMARY,
        secondary: THEME_DARK_TEXT_SECONDARY,
        disabled: THEME_DARK_TEXT_SECONDARY,
        icon: THEME_DARK_TEXT_SECONDARY
      },
      divider: THEME_DARK_DIVIDER,
      action: {
        active: THEME_DARK_ACTION_ACTIVE,
        hover: THEME_DARK_ACTION_HOVER,
        hoverOpacity: THEME_DARK_ACTION_HOVER_OPACITY,
        selected: THEME_DARK_ACTION_SELECTED,
        selectedOpacity: THEME_DARK_ACTION_SELECTED_OPACITY,
        disabled: THEME_DARK_ACTION_DISABLED,
        disabledBackground: THEME_DARK_ACTION_DISABLED_BACKGROUND,
        disabledOpacity: THEME_DARK_ACTION_DISABLED_OPACITY,
        focus: THEME_DARK_ACTION_FOCUS,
        focusOpacity: THEME_DARK_ACTION_FOCUS_OPACITY,
        activatedOpacity: THEME_DARK_ACTION_ACTIVATED_OPACITY
      }
    },
    shape: {
      borderRadius: THEME_SHAPE_BORDER_RADIUS
    },
    components: {
      ...globalOverrides.components,
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: THEME_DARK_DIVIDER
            }
          }
        }
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            borderColor: THEME_DARK_DIVIDER,
            textTransform: 'none !important'
          } as ComponentsOverrides['MuiButtonBase']
        }
      }
    }
  }
)

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })
