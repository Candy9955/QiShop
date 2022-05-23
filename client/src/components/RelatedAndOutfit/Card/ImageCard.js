import { useState } from 'react'
import {
  Box,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import CardInfo from './CardInfo'
import { StarRating } from 'components/Stars'
import calcAvgRating from 'utils/calcAvgRating'
import sanitizePhotoUrl from 'utils/sanitizePhotoUrl'

const ImageCard = ({
  product, productStyles, reviewsMeta, topIcon,
  onTopIconClick = () => { }, onImageClick = () => { },
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { avgRating } = calcAvgRating(reviewsMeta)
  const photo = sanitizePhotoUrl(productStyles[0].photos[0])

  const handleBottomIconClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <ImageListItem sx={{ border: 1, borderRadius: 1, borderColor: 'primary.main' }}>
      <Box sx={{ width: 250, height: 350 }}>
        <ImageListItemBar
          position='top'
          sx={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)' }}
          actionIcon={
            <IconButton
              sx={{ color: 'white' }}
              onClick={() => { onTopIconClick(product.id) }}>
              {topIcon}
            </IconButton>
          }
        />
        <Box onClick={() => { onImageClick(product.id) }}>
          <img
            src={photo.thumbnail_url}
            alt='thumbnail'
            loading='lazy'
            style={{ objectFit: 'cover', width: 250, height: 250 }}
          />
        </Box>
        <ImageListItemBar
          position='below'
          sx={{ '& .MuiImageListItemBar-titleWrap': { p: 1 } }}
          title={
            <Box>
              <Typography sx={{ fontSize: 12 }}>
                {product.category?.toUpperCase()}
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                {product.name}
              </Typography>
              <Typography variant='body2' sx={{ py: 0.5 }}>
                ${product.default_price}
              </Typography>
              <StarRating ratingValue={avgRating} size='small' />
            </Box>
          }
          actionIcon={
            <Tooltip title='More Styles' placement='left'>
              <IconButton sx={{ color: 'primary.light' }} onClick={handleBottomIconClick}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <Popover
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <CardInfo productStyles={productStyles} />
        </Popover>
      </Box>
    </ImageListItem >
  )
}

export default ImageCard
