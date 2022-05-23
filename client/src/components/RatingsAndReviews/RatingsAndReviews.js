import { useEffect, useState } from 'react'
import {
  Box,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import {
  getReviews,
  reviewHelpful,
  reportReview,
  createNewReview,
} from 'api/reviews'
import RatingsBreakdown from './RatingsBreakdown'
import CharacteristicsBreakdown from './CharacteristicsBreakdown'
import ReviewsBreakdown from './ReviewsBreakdown'
import CustomDialog from 'components/CustomDialog'
import ReviewForm from './ReviewForm'
import Loading from '../Loading'
import calcAvgRating from 'utils/calcAvgRating'
import { useStore } from 'store'

const RatingsAndReviews = ({ reviewsMeta }) => {
  const { openAlert } = useStore()

  const [reviews, setReviews] = useState()
  const [sort, setSort] = useState('helpful')
  const [ratingsFilter, setRatingsFilter] = useState([])
  const [open, setOpen] = useState(false)

  const { product_id: productId, characteristics, ratings, recommended } = reviewsMeta
  const { avgRating, count } = calcAvgRating(reviewsMeta)

  const refreshReviews = (count, sort, productId) => {
    getReviews(1, count, sort, productId).then(({ data }) => {
      data = data.results
      // console.log('@@ getReviews', productId, data)
      setReviews(data)
    }).catch(err => {
      openAlert(err.response.data)
    })
  }

  useEffect(() => {
    setRatingsFilter([])
  }, [productId])

  useEffect(() => {
    refreshReviews(count, sort, productId)
  }, [count, sort, productId])

  const handleRatingBarClick = (rating) => {
    setRatingsFilter(prevFilter => {
      const exists = prevFilter.includes(rating)
      if (exists) {
        return prevFilter.filter(rt => rt !== rating)
      } else {
        return prevFilter.concat(rating)
      }
    })
  }

  const handleSortChange = (sort) => {
    setSort(sort)
  }

  const handleHelpfulClick = (reviewId) => {
    reviewHelpful(reviewId).then(() => {
      refreshReviews(count, sort, productId)
    }).catch(err => {
      openAlert(err.response.data)
    })
  }

  const handleReportClick = (reviewId) => {
    reportReview(reviewId).then(() => {
      console.log(`Reported reviewId ${reviewId} successfully`)
      refreshReviews(count, sort, productId)
    }).catch(err => {
      openAlert(err.response.data)
    })
  }

  const handleReviewSubmit = (review) => {
    // console.log(review)
    createNewReview(review).then(() => {
      refreshReviews(count, sort, productId)
    }).catch(err => {
      openAlert(err.response.data)
    })
  }

  const handleNewReviewClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    reviews ? (
      <Box>
        <Typography variant='body1' fontWeight='bold'>RATINGS & REVIEWS</Typography>
        <Grid container spacing={{ xs: '1%', sm: '5%', xl: '10%' }}>
          <Grid item xs={12} sm={4}>
            <RatingsBreakdown
              productId={productId}
              ratings={ratings}
              recommended={recommended}
              reviewsAverageRating={avgRating}
              onRatingBarClick={handleRatingBarClick}
            />
            <Divider sx={{ my: 4 }} />
            <CharacteristicsBreakdown characteristics={characteristics} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <ReviewsBreakdown
              productId={productId}
              reviews={reviews}
              ratingsFilter={ratingsFilter}
              onSortChange={handleSortChange}
              onHelpfulClick={handleHelpfulClick}
              onReportClick={handleReportClick}
              onNewReviewClick={handleNewReviewClick}
            />
          </Grid>
        </Grid>
        <CustomDialog
          open={open}
          onClose={handleClose}
          title='Write Your Review'
          fullScreen
        >
          <ReviewForm
            productId={productId}
            characteristics={characteristics}
            onReviewSubmit={handleReviewSubmit}
          />
        </CustomDialog>
      </Box >
    ) : <Loading />
  )
}

export default RatingsAndReviews
