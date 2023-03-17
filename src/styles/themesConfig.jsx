import { blueGrey, purple } from '@mui/material/colors'

const darkText = {
  primary: '#FFFFFF',
  secondary: blueGrey[500],
  disabled: blueGrey[300],
  contrast: '#000000',
}

const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#4c4cff',
    },
    secondary: {
      main: purple[300],
    },
    text: darkText,
    background: {
      paper: '#212121',
      default: '#121212',
      contrast: {
        paper: '#a0a0a0',
      },
    },
    success: {
      main: '#43a047',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    allVariants: {
      color: darkText.primary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          backgroundColor: '#4c4cff',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#3030ff',
          },
        },
        outlined: {
          borderColor: '#4c4cff',
          color: '#4c4cff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#121212',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#212121',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: '#4c4cff',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: darkText.secondary,
        },
      },
    },
  },
}

const themesConfig = {
  default: darkTheme,
}

export default themesConfig
