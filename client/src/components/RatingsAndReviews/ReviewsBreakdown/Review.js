import { useState } from 'react'
import {
  Avatar,
  Box,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  Link,
  Modal,
  Typography,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import highlighted from 'utils/highlighted'
import { StarRating } from 'components/Stars'

const Review = ({ review, keyword, onHelpfulClick, onReportClick }) => {
  const [displayMore, setDisplayMore] = useState(false)
  const [open, setOpen] = useState(false)
  const [photoUrl, setPhotoUrl] = useState(0)

  const {
    body,
    date,
    helpfulness,
    photos,
    rating,
    recommend,
    response,
    review_id: reviewId,
    reviewer_name: reviewerName,
    summary,
  } = review

  const bodyLength = body?.length || 0
  const hasResponse = response?.length > 0
  const hasPhoto = photos?.length > 0

  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formatDate = (dateStr) => {
    return dateTimeFormat.format(new Date(dateStr))
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ pt: 1, display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
        <Typography variant='body2'>{reviewerName}</Typography>
        <Typography variant='body2' sx={{ ml: 'auto' }}>{formatDate(date)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', pb: 1 }}>
        <StarRating size='small' ratingValue={rating} />
        {summary &&
          <Typography sx={{ pl: 1, fontWeight: 'bold' }} >{highlighted(summary, keyword)}</Typography>
        }
      </Box>
      {body &&
        <Box sx={{ pb: 1 }}>
          {bodyLength > 250 && !displayMore ? (
            <Typography>
              {highlighted(body.slice(0, 250), keyword)}
              <span> ... </span>
              <Link component='button' onClick={() => { setDisplayMore(true) }}>Show More</Link>
            </Typography>
          ) : (
            <Typography>
              {highlighted(body, keyword)}
            </Typography>
          )}
        </Box>
      }
      {hasResponse &&
        <Typography sx={{ pb: 1 }} variant='body2'>
          <strong>Response: </strong>{response}
        </Typography>
      }
      {hasPhoto &&
        <ImageList sx={{ mt: 0, mb: 1 }} cols={5} rowHeight={100}>
          {photos.map((photo) => (
            <ImageListItem key={photo.id} onClick={() => { setPhotoUrl(photo.url); handleOpen(); }}>
              <img
                src={photo.url}
                alt=''
                style={{ objectFit: 'cover', width: 100, height: 100 }}
                loading='lazy'
              />
            </ImageListItem>
          ))}
        </ImageList>
      }
      <Modal open={open} onClose={handleClose} onClick={handleClose}>
        <Box sx={{ width: '100%', height: '100%' }}>
          <img
            src={photoUrl}
            alt=''
            style={{ objectFit: 'scale-down', width: '100%', height: '100%' }}
          />
        </Box>
      </Modal>
      {recommend &&
        <Box sx={{ pb: 1, display: 'flex', alignItems: 'center' }}>
          <CheckIcon
            fontSize='small'
          // sx={{ fontSize: 16 }}
          />
          <Typography variant='body2' sx={{ ml: 1 }}>
            I recommend this product
          </Typography>
        </Box>
      }
      <Box sx={{ pb: 1, display: 'flex', alignItems: 'center' }}>
        <Chip
          size='small'
          color='primary'
          label={`Helpful (${helpfulness})`}
          variant='outlined'
          onClick={() => onHelpfulClick(reviewId)}
        />
        <Divider sx={{ mx: 2 }} orientation='vertical' flexItem />
        <Link component='button' color='text.secondary' onClick={() => onReportClick(reviewId)}>Report</Link>
      </Box>
    </Box>
  )
}

export default Review
