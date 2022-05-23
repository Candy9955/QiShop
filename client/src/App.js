import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from './theme'
import { useStore } from './store'
import Main from './components/Main'
import Home from './components/Home'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import NoMatch from './components/NoMatch'

const App = () => {
  const { colorMode } = useStore()
  const theme = colorMode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route path='/' element={<Main />}>
          <Route index element={<Home />} />
          <Route path='product' element={<Home />}>
            <Route path=':productId' element={<Home />} />
          </Route>
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
