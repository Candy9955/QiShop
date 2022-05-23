import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded'
import sanitizePhotoUrl from 'utils/sanitizePhotoUrl'

const ItemStyles = ({
  productStyles, currentStyle, handleStyleOnClick
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
        <Typography sx={{ fontWeight: 'bold' }}>STYLE</Typography>
        <ArrowRightRoundedIcon />
        <Typography>{currentStyle.name}</Typography>
      </Box>
      <ImageList cols={4} gap={16}>
        {productStyles.map((style) => (
          <ImageListItem key={style.name}>
            <IconButton
              color='primary'
              sx={{ p: 0, border: 1.5, borderColor: 'primary.main', '&:hover': { opacity: 0.5 } }}
              onClick={() => handleStyleOnClick(style)}
              disabled={style.style_id === currentStyle.style_id}
            >
              {
                (style.style_id === currentStyle.style_id) ?
                  <CheckCircleRoundedIcon
                    fontSize='small'
                    sx={{ position: 'absolute', right: 0, top: 0, color: 'green', bgcolor: 'white', borderRadius: '50%' }}
                  /> : null
              }
              <img
                src={sanitizePhotoUrl(style.photos[0]).thumbnail_url}
                alt={style.name}
                loading='lazy'
                style={{ aspectRatio: 1, objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }}
              />
            </IconButton>
          </ImageListItem>
        ))
        }
      </ImageList >
    </Box >
  )
}

export default ItemStyles
