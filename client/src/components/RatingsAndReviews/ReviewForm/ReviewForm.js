import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material'
import FormRecommend from './FormRecommend'
import FormCharacteristics from './FormCharacteristics'
import UploadImages from 'components/UploadImages'
import { StarRatingHover } from 'components/Stars'

const ReviewForm = ({ productId, characteristics, onReviewSubmit }) => {
  const [review, setReview] = useState({
    product_id: Number(productId),
    photos: [],
  })

  const handleInputChange = (value, fieldName) => {
    setReview(prev => {
      const review = { ...prev }
      if (fieldName === 'photos') {
        review[fieldName].push(value)
      } else {
        review[fieldName] = value
      }
      return review
    })
  }

  const handlePhotoUpload = (url) => {
    handleInputChange(url, 'photos')
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const chars = Object.keys(characteristics).reduce((res, x) => {
      res[characteristics[x].id] = Number(review[x.toLowerCase()])
      return res
    }, {})
    const newReview = {
      product_id: review.product_id,
      rating: parseInt(review.rating, 10),
      summary: review.summary,
      body: review.body,
      recommend: review.recommend === 'yes',
      name: review.name,
      email: review.email,
      photos: review.photos,
      characteristics: chars,
    }
    onReviewSubmit(newReview)
  }

  return (
    <form style={{ flex: 1 }} onSubmit={handleFormSubmit}>
      <Typography sx={{ pb: 1, textAlign: 'center' }}>
        Tell Us About The Product
      </Typography>
      <Box sx={{ pb: 2 }}>
        <Typography variant='body2'>Overall Rating</Typography>
        <StarRatingHover onInputChange={handleInputChange} size='small' />
      </Box>
      <Box sx={{ pb: 2 }}>
        <FormRecommend onInputChange={handleInputChange} />
      </Box>
      <Box sx={{ pb: 3 }}>
        <FormCharacteristics onInputChange={handleInputChange} />
      </Box>
      <Box sx={{ pb: 3, display: 'flex' }}>
        <Box sx={{ flex: 1, pr: 5, display: 'flex', flexDirection: 'column' }}>
          <TextField
            label='Nickname'
            size='small'
            inputProps={{ maxLength: 60 }}
            placeholder='Example: jackson11!'
            onChange={(e) => { handleInputChange(e.target.value, 'name') }}
            required
          />
          <Typography variant='body2'>
            For privacy reasons, do not use your full name or email address
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TextField
            label='Email'
            size='small'
            type='email'
            inputProps={{ maxLength: 60 }}
            placeholder='Example: jackson11@email.com'
            onChange={(e) => { handleInputChange(e.target.value, 'email') }}
            required
          />
          <Typography variant='body2'>
            For authentication reasons, you will not be emailed
          </Typography>
        </Box>
      </Box>
      <Box sx={{ pb: 3, display: 'flex', flexDirection: 'column' }}>
        <TextField
          label='Review Summary'
          inputProps={{ maxLength: 60 }}
          placeholder='Example: Best purchase ever!'
          onChange={(e) => { handleInputChange(e.target.value, 'summary') }}
          required
        />
      </Box>
      <Box sx={{ pb: 3, display: 'flex', flexDirection: 'column' }}>
        <TextField
          label='Review Body'
          inputProps={{ maxLength: 1000, minLength: 50 }}
          placeholder='Why did you like the product or not?'
          onChange={(e) => { handleInputChange(e.target.value, 'body') }}
          multiline
          rows={6}
          required
        />
        <Typography variant='body2'>
          {review.body && review.body.length > 50 ? (
            <span>Minimum reached</span>
          ) : (
            <span>Minimum required characters left: {review.body ? (50 - review.body.length) : 50}</span>
          )}
        </Typography>
      </Box>
      <Box sx={{ pb: 1 }}>
        <Typography>Upload your photo</Typography>
        <UploadImages onPhotoUpload={handlePhotoUpload} />
      </Box>
      <Box sx={{ pb: 3, display: 'flex', justifyContent: 'center' }}>
        <Button type='submit' variant='contained'>Submit</Button>
      </Box>
    </form>
  )
}

export default ReviewForm
