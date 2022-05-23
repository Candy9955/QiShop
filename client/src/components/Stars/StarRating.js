import {
  Box,
  Rating,
  Typography,
} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const labels = {
  0.5: 'Poor-',
  1: 'Poor',
  1.5: 'Fair-',
  2: 'Fair',
  2.5: 'Ok',
  3: 'Average',
  3.5: 'Good-',
  4: 'Good',
  4.5: 'Great-',
  5: 'Great',
}

const StarRating = ({ ratingValue, size, showText = false, showNumber = false }) => {
  let typography = 'body1'
  if (size === 'small') {
    typography = 'caption'
  }

  ratingValue = ratingValue || 0
  ratingValue = Number(ratingValue)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {showNumber &&
        <Box sx={{ pr: 1 }}>{ratingValue}</Box>
      }
      <Rating
        size={size}
        value={ratingValue}
        readOnly
        precision={0.5}
        emptyIcon={
          <StarBorderIcon sx={{ color: 'rating.main' }} fontSize='inherit' />
        }
      />
      {showText &&
        <Typography sx={{ ml: 1.5 }} variant={typography}>
          {labels[ratingValue]}
        </Typography>
      }
    </Box>
  )
}

export default StarRating
