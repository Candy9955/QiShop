import { Link as RouterLink } from 'react-router-dom'
import {
  Link,
  Typography,
} from '@mui/material'

const Copyright = (props) => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' component={RouterLink} to='/'>
        Qi Shop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
