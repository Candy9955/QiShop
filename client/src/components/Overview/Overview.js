import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import Loading from '../Loading'
import Price from './Price'
import ItemStyles from './ItemStyles'
import { StarRating } from '../Stars'
import SizeSelector from './SizeSelector'
import SocialShare from './SocialShare'
import ImageGallery from './ImageGallery'
import calcAvgRating from 'utils/calcAvgRating'
import sanitizePhotoUrl from 'utils/sanitizePhotoUrl'

const deduplicate = (objArr, key) => {
  const keys = objArr.map(obj => obj[key])
  const filtered = objArr.filter((obj, index) => !keys.includes(obj[key], index + 1))
  return filtered
}

const Overview = ({ product, productStyles, reviewsMeta }) => {
  const [currentStyle, setCurrentStyle] = useState(productStyles[0])
  const { category, name, slogan, description } = product
  const { avgRating } = calcAvgRating(reviewsMeta)

  // sanitize images data
  const styleImages = deduplicate(currentStyle.photos, 'url').map(photo => sanitizePhotoUrl(photo))
  const imageGalleryReady = styleImages.length > 0

  useEffect(() => {
    setCurrentStyle(productStyles[0])
  }, [productStyles])

  const handleStyleOnClick = (style) => {
    setCurrentStyle(style)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        {imageGalleryReady ?
          <ImageGallery styleImages={styleImages} />
          : <Loading />
        }
      </Grid>
      <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column' }}>
        {avgRating ?
          <Box sx={{ display: 'flex', pt: 2, pb: 1 }}>
            <StarRating ratingValue={avgRating} size='small' />
            <Link sx={{ pl: 1 }} href='#ratings' variant='body2'>Read all reviews</Link>
          </Box> : null
        }
        <Box sx={{ pb: 1 }}>
          <Typography>{category}</Typography>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>{name}</Typography>
        </Box>
        <Box sx={{ pb: 1 }}>
          <Price
            salePrice={currentStyle.sale_price}
            origPrice={currentStyle.original_price}
          />
        </Box>
        <Box sx={{ pb: 1 }}>
          <ItemStyles
            productStyles={productStyles}
            currentStyle={currentStyle}
            handleStyleOnClick={handleStyleOnClick}
          />
        </Box>
        <Box sx={{ pb: 1 }}>
          <SizeSelector
            currentStyle={currentStyle}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'end' }}>
          <SocialShare />
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Typography sx={{ fontWeight: 'bold' }}>{slogan}</Typography>
        <Typography>{description}</Typography>
      </Grid>
      <Grid item xs={4}>
        {['GMO and Pesticide-free', 'Made with 100% Genetic Modification', 'Good Stuff'].map(text => (
          <Box key={text} sx={{ display: 'flex', pb: 1.5, color: 'text.secondary' }}>
            <CheckIcon fontSize='small' sx={{ mr: 1 }} />
            <Typography variant='body2'>
              <strong>{text}</strong>
            </Typography>
          </Box>
        ))}
      </Grid>
    </Grid>
  )
}

Overview.defaultProps = {
  product: {},
  reviewsStarAverage: null,
}

export default Overview
