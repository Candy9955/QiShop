import { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Link,
  Slide,
  Toolbar,
  Tooltip,
  useScrollTrigger,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { getCart } from 'api/cart'
import { useStore } from 'store'
import ColorModeButton from '../ColorModeButton'

const HideOnScroll = ({ enabled, children }) => {
  const trigger = useScrollTrigger()
  return (
    enabled ? (
      <Slide appear={false} direction='down' in={!trigger}>
        {children}
      </Slide>
    ) : (
      <>{children}</>
    )
  )
}

const NavBar = ({ hideOnScroll }) => {
  const { openAlert, cart, setCart } = useStore()
  const cartCount = cart?.length || 0

  useEffect(() => {
    getCart().then(({ data }) => {
      // console.log('@@ getCart', data)
      setCart(data)
    }).catch(err => {
      openAlert(err.response.data)
    })
  }, [setCart, openAlert])

  return (
    <HideOnScroll enabled={hideOnScroll}>
      <AppBar position='sticky'>
        <Toolbar>
          <Tooltip title='Menu'>
            <IconButton color='inherit' edge='start' sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Link variant='h5' underline='none' color='inherit' component={RouterLink} to='/'>
            EVERLINE
          </Link>
          <Box sx={{ flex: 1 }}></Box>
          <ColorModeButton color='inherit' />
          <Tooltip title='Notifications'>
            <IconButton color='inherit' sx={{ ml: 0.5 }}>
              <Badge badgeContent={3} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title='Shopping Cart'>
            <IconButton color='inherit' sx={{ ml: 0.5 }} component={RouterLink} to='/cart'>
              <Badge color='secondary' badgeContent={cartCount}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title='Account'>
            <IconButton color='inherit' edge='end' sx={{ ml: 0.5 }} component={RouterLink} to='/signin'>
              <AccountCircle />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

export default NavBar
