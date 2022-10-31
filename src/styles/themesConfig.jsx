import { red } from '@mui/material/colors'

const darkText = {
  primary: 'rgb(255,255,255)',
  secondary: 'rgb(229, 231, 235)',
  disabled: 'rgb(156, 163, 175)',
}

const skyBlue = {
  50: '#e4fafd',
  100: '#bdf2fa',
  200: '#91e9f7',
  300: '#64e0f3',
  400: '#43daf1',
  500: '#22d3ee',
  600: '#1eceec',
  700: '#19c8e9',
  800: '#14c2e7',
  900: '#0cb7e2',
  A100: '#ffffff',
  A200: '#daf7ff',
  A400: '#a7ecff',
  A700: '#8de6ff',
  contrastDefaultColor: 'dark',
}

const themesConfig = {
  default: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: skyBlue[100],
        main: skyBlue[500],
        dark: skyBlue[900],
      },
      secondary: {
        light: '#ea7de5',
        main: '#cd70c9',
        dark: '#a751a4',
      },
      background: {
        paper: '#1E2125',
        default: '#121212',
      },
      error: red,
    },
    typography: {
      allVariants: {
        color: darkText.primary,
      },
    },
    status: {
      danger: 'orange',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          color: skyBlue[500],
        },
      },
    },
  },
}

export default themesConfig
