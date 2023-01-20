import { createTheme } from '@mui/material'
import COLORS from 'styles/_colors.scss'
import SIZES from 'styles/_sizes.scss'

const baseFontSize = SIZES.sm_font_size

export const theme = createTheme({
  typography: {
    fontFamily: `"Montserrat", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 800,
  },
  palette: {
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
    error: {
      main: COLORS.red,
    },
    info: {
      main: COLORS.dark_gray,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 'bold',
          borderRadius: '8px',
          boxShadow: '0 0',
          height: '45px',
          margin: '35px auto 0',
          minWidth: '200px',
          padding: '1px 20px 0',
          textTransform: 'none',
          '&:hover': {
            boxShadow: '0 0',
          },
          disabled: {
            background: COLORS.disabled_bg_color,
            color: COLORS.disabled_text_color,
          },
        },
        containedPrimary: {
          color: COLORS.white,
          '&:hover': {
            background: COLORS.primary_hover,
          },
        },
        containedSecondary: {
          color: COLORS.white,
          '&:hover': {
            background: COLORS.secondary_hover,
          },
        },
        containedInfo: {
          color: COLORS.white,
          '&:hover': {
            background: COLORS.dark_gray,
          },
        },
        outlinedPrimary: {
          background: 'none',
          border: `1px solid ${COLORS.primary}`,
          color: COLORS.$primary,
          '&:hover': {
            border: `1px solid ${COLORS.primary_hover}`,
          },
        },
        outlinedSecondary: {
          background: 'none',
          border: `1px solid ${COLORS.secondary}`,
          '&:hover': {
            border: `1px solid ${COLORS.secondary_hover}`,
          },
        },
        sizeSmall: {
          borderRadius: '6px',
          height: '25px',
          minWidth: '150px',
          padding: ' 1px 10px 0',
        },
        sizeMedium: {
          height: '45px',
        },
        sizeLarge: {
          height: '60px',
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {},
      },
    },

    MuiDialog: {
      styleOverrides: {
        root: {
          minWidth: '350px',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {},
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          margin: '0 10px',
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: baseFontSize,
        },
      },
    },

    MuiGrid2: {
      styleOverrides: {
        root: {
          fontSize: baseFontSize,
        },
      },
    },
  },
})
