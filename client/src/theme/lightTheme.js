import { createTheme } from '@mui/material/styles'
import themeBase from './themeBase'

const lightTheme = createTheme({
  ...themeBase,
  palette: {
    mode: 'light',
    primary: {
      main: '#316a83',
    },
    secondary: {
      main: '#834a31',
    },
    rating: {
      main: '#faaf00',
    },
    search: {
      main: '#ffff00',
      contrastText: '#000',
    },
  },
})

export default lightTheme
