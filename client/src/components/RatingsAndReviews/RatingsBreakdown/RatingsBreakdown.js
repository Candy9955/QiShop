import {
  Box,
  Typography,
} from '@mui/material'
import RatingBar from './RatingBar'
import { StarRating } from 'components/Stars'

const RatingsBreakdown = ({
  productId, ratings, recommended, reviewsAverageRating,
  onRatingBarClick,
}) => {
  let recommendPercent = Number(recommended.true)
    / ((Number(recommended.true) || 0) + (Number(recommended.false) || 0))
  recommendPercent = `${(recommendPercent * 100 || 0).toFixed(0)}%`

  const totalCount = Object.entries(ratings).reduce((res, x) => res + Number(x[1]), 0)
  const starRange = ['5', '4', '3', '2', '1']

  return (
    <Box>
      <Box sx={{ display: 'flex', my: 1 }}>
        <Typography variant='h4' sx={{ pr: 1 }}>
          {reviewsAverageRating || 0}
        </Typography>
        <StarRating ratingValue={reviewsAverageRating} />
      </Box>
      <Typography variant='body2' sx={{ my: 1 }}>
        {recommendPercent} of reviews recommend this product
      </Typography>
      <Box sx={{ my: 2 }}>
        {starRange.map((range) => {
          const barCount = ratings[range] ? Number(ratings[range]) : 0
          const percentage = totalCount ? barCount / totalCount * 100 : 0
          return (
            <Box key={range} sx={{ my: 1.5 }}>
              <RatingBar
                productId={productId}
                range={range}
                percentage={percentage}
                onRatingBarClick={onRatingBarClick}
              />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

RatingsBreakdown.defaultProps = {
  ratings: {
    1: '0', 2: '0', 3: '0', 4: '0', 5: '0',
  },
  recommended: {},
}

export default RatingsBreakdown
