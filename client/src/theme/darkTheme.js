import { createTheme } from '@mui/material/styles'
import themeBase from './themeBase'

const darkTheme = createTheme({
  ...themeBase,
  palette: {
    mode: 'dark',
    primary: {
      main: '#97bdd2',
      // main: '#75a2b9',
    },
    secondary: {
      // main: '#d2ac97',
      main: '#b98c75',
    },
    rating: {
      main: '#faaf00',
    },
    search: {
      main: '#ffff00',
      contrastText: '#000',
    },
    background: {
      // default: '#000a12',
      // paper: '#000a12',
      default: '#263238',
      paper: '#263238',
    },
  },
})

export default darkTheme
