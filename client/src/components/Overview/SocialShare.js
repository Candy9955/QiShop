import {
  Box,
  IconButton,
} from '@mui/material'
import {
  FaFacebookSquare,
  FaPinterestSquare,
  FaTwitterSquare,
  FaWhatsappSquare,
} from 'react-icons/fa'
import { ReactComponent as InstagramColorIcon } from 'assets/instagram-color.svg'

const buttonSx = { p: 1 }

const SocialShare = () => {
  return (
    <Box>
      <IconButton size='large' sx={buttonSx}>
        <FaFacebookSquare color='#3b5998' />
      </IconButton>
      <IconButton size='large' sx={buttonSx}>
        <InstagramColorIcon style={{ width: 26, height: 26 }} />
      </IconButton>
      <IconButton size='large' sx={buttonSx}>
        <FaTwitterSquare color='#00aced' />
      </IconButton>
      <IconButton size='large' sx={buttonSx}>
        <FaWhatsappSquare color='#25D366' />
      </IconButton>
      <IconButton size='large' sx={buttonSx}>
        <FaPinterestSquare color='#cb2128' />
      </IconButton>
    </Box>
  )
}

export default SocialShare
