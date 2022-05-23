import { Outlet } from 'react-router-dom'
import {
  Alert,
  Box,
  Snackbar,
} from '@mui/material'
import { useStore } from 'store'
import NavBar from '../NavBar'
import Copyright from '../Copyright'

const Main = () => {
  const { alertOpen, alertText, closeAlert } = useStore()

  return (
    <Box>
      <NavBar hideOnScroll={false} />
      <Outlet />
      <Copyright />
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={closeAlert}>
        <Alert severity='error' variant='filled' onClose={closeAlert}>
          {alertText}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Main
