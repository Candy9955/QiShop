import {
  Box,
  IconButton,
  ImageListItem,
  Typography,
} from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'

const EmptyCard = ({ onIconClick }) => {
  return (
    <ImageListItem sx={{ border: 1, borderRadius: 1, borderColor: 'primary.main' }}>
      <Box
        sx={{
          width: 250,
          height: 350,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>Add to Outfit</Typography>
        <IconButton sx={{ color: 'primary.main' }} onClick={onIconClick}>
          <AddCircleOutlineRoundedIcon fontSize='large' />
        </IconButton>
      </Box>
    </ImageListItem>
  )
}

export default EmptyCard
