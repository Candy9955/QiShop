import { useState } from 'react'
import {
  Box,
  Divider,
  ImageList,
  ImageListItem,
  Link,
  Modal,
  Typography,
} from '@mui/material'
import highlighted from 'utils/highlighted'

const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const formatDate = (dateStr) => {
  return dateTimeFormat.format(new Date(dateStr))
}

const Answer = ({
  answer, keyword, onAnswerHelpfulClick, onAnswerReportClick,
}) => {
  const {
    id: answerId,
    body,
    date,
    answerer_name: answererName,
    helpfulness,
    photos,
  } = answer
  const [open, setOpen] = useState(false)
  const [photoUrl, setPhotoUrl] = useState()
  const hasPhotos = photos?.length > 0

  const handleImageClick = (url) => {
    setPhotoUrl(url)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  return (
    <Box>
      <Typography variant='body1'>
        {highlighted(body, keyword)}
      </Typography>
      {hasPhotos &&
        <ImageList sx={{ my: 1 }} cols={5} rowHeight={100}>
          {photos.map((url, index) => (
            <ImageListItem key={index} onClick={() => { handleImageClick(url) }}>
              <img
                src={url}
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
      <Box
        sx={{
          mt: 0.5,
          display: 'flex',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.secondary',
        }}
      >
        <Typography variant='inherit'>
          by {answererName}, {formatDate(date)}
        </Typography>
        <Divider sx={{ mx: 2 }} orientation='vertical' flexItem />
        <Typography variant='inherit'>
          {`Helpful? `}
          <Link
            component='button'
            sx={{ typography: 'caption' }}
            onClick={() => onAnswerHelpfulClick(answerId)}
          >
            Yes
          </Link>
          {` (${helpfulness})`}
        </Typography>
        <Divider sx={{ mx: 2 }} orientation='vertical' flexItem />
        <Link
          component='button'
          color='text.secondary'
          sx={{ typography: 'caption' }}
          onClick={() => onAnswerReportClick(answerId)}
        >
          Report
        </Link>
      </Box>
    </Box>
  )
}

export default Answer
