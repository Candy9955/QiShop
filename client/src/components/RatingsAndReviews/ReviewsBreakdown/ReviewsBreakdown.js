import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Box,
  Button,
  Divider,
} from '@mui/material'
import SortMenu from './SortMenu'
import Review from './Review'
import SearchBox from 'components/SearchBox'

const PAGE_SIZE = 5

const ReviewsBreakdown = ({
  productId, reviews, ratingsFilter,
  onSortChange, onHelpfulClick, onReportClick, onNewReviewClick
}) => {
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)

  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('reviews') || ''

  useEffect(() => {
    setDisplayCount(PAGE_SIZE)
  }, [productId])

  // filter by ratings selected
  let newData = ratingsFilter.length === 0
    ? reviews.slice()
    : reviews.slice().filter((x) => ratingsFilter.includes(x.rating))

  // filter by search keyword
  if (keyword.length > 2) {
    newData = newData.filter((x) => (x.body.toLowerCase().includes(keyword.toLowerCase())
      || x.summary.toLowerCase().includes(keyword.toLowerCase())))
  }

  const displayReviews = newData.slice(0, displayCount)
  const btnVisible = newData.length > displayCount

  const handleMoreReviewsClick = () => {
    setDisplayCount(prevCount => prevCount + PAGE_SIZE)
  }

  const handleSearchChange = (value) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('reviews', value)
    setSearchParams(newSearchParams)
  }

  return (
    <Box>
      <SortMenu
        onSortChange={onSortChange}
        reviews={reviews}
      />
      <Box sx={{ my: 2 }}>
        <SearchBox
          label='Search for reviews...'
          value={keyword}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </Box>
      <Box sx={{ mb: 2, maxHeight: '70vh', overflow: 'auto' }}>
        {displayReviews.map((review) => (
          <Box key={review.review_id}>
            <Review
              review={review}
              keyword={keyword}
              onHelpfulClick={onHelpfulClick}
              onReportClick={onReportClick}
            />
            <Divider sx={{ my: 1 }} />
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex' }}>
        {btnVisible &&
          <Button sx={{ mr: 2, fontWeight: 'bold' }} variant='outlined' onClick={handleMoreReviewsClick}>
            More Reviews
          </Button>
        }
        <Button sx={{ fontWeight: 'bold' }} variant='outlined' onClick={onNewReviewClick}>
          Add A Review +
        </Button>
      </Box>
    </Box>
  )
}

export default ReviewsBreakdown
