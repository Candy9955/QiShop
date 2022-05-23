import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
} from '@mui/material'

const NoMatch = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AppBar position='static' sx={{ background: 'rgba(0,0,0,0.8)' }}>
        <Toolbar>
          <Link
            variant='h5'
            underline='none'
            color='inherit'
            component={RouterLink}
            to='/'
          >
            EVERLINE
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          // flex: 1,
          p: { xs: 2, sm: 3 },
          background: 'rgba(0,0,0,0.5)',
        }}
        color='white'
      >
        <Typography variant='h3'>
          4 0 4
        </Typography>
        <Typography variant='h6'>
          The page you were looking for could not be found.
        </Typography>
        <Button
          variant='outlined'
          color='inherit'
          sx={{
            mt: 1,
            border: 2,
            borderRadius: 0,
          }}
          component={RouterLink}
          to='/'
        >
          <strong>Take me home</strong>
        </Button>
      </Box>
    </Box>
  )
}

export default NoMatch
