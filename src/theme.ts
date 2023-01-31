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
          margin: '35px auto 0',
          padding: '0 20px',
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
          color: COLORS.primary,
          '&:hover': {
            border: `1px solid ${COLORS.primary_hover}`,
          },
        },
        outlinedSecondary: {
          background: 'none',
          border: `1px solid ${COLORS.secondary}`,
          color: COLORS.text_color,
          '&:hover': {
            border: `1px solid ${COLORS.secondary_hover}`,
          },
        },
        sizeSmall: {
          borderRadius: '6px',
          fontSize: '20px',
          height: '35px',
          minWidth: '150px',
        },
        sizeMedium: {
          fontSize: '26px',
          borderRadius: '15px',
          height: '60px',
          minWidth: '220px',
          padding: '0 25px',
        },
        sizeLarge: {
          fontSize: '26px',
          height: '70px',
          minWidth: '250px',
          padding: '0 30px',
        },

        outlinedSizeMedium: {
          borderWidth: '3px',
          '&:hover': {
            borderWidth: '3px',
          },
        },
        outlinedSizeLarge: {
          borderWidth: '3px',
          '&:hover': {
            borderWidth: '3px',
          },
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

    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },
  },
})
