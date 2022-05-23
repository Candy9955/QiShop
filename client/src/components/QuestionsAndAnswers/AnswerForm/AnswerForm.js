import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material'
import UploadImages from 'components/UploadImages'

const AnswerForm = ({ productName, questionBody, onAnswerSubmit }) => {
  const [answer, setAnswer] = useState({ photos: [] })

  const handleInputChange = (value, fieldName) => {
    setAnswer(prevObj => {
      const obj = { ...prevObj }
      if (fieldName === 'photos') {
        obj[fieldName] = obj[fieldName].concat(value)
      } else {
        obj[fieldName] = value
      }
      return obj
    })
  }

  const handlePhotoUpload = (url) => {
    handleInputChange(url, 'photos')
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    onAnswerSubmit(answer)
  }

  return (
    <form style={{ flex: 1 }} onSubmit={handleFormSubmit}>
      <Typography sx={{ pb: 1, fontWeight: 'bold' }}>
        {productName}
      </Typography>
      <Typography sx={{ pb: 1, fontWeight: 'bold' }}>
        Q: {questionBody}
      </Typography>
      <Box sx={{ pb: 3, display: 'flex', flexDirection: 'column' }}>
        <TextField
          label='Your Answer'
          inputProps={{ maxLength: 1000 }}
          onChange={(e) => { handleInputChange(e.target.value, 'body') }}
          multiline
          rows={6}
          required
        />
      </Box>
      <Box sx={{ pb: 3, display: 'flex' }}>
        <Box sx={{ flex: 1, pr: 5, display: 'flex', flexDirection: 'column' }}>
          <TextField
            label='Nickname'
            size='small'
            inputProps={{ maxLength: 60 }}
            placeholder='Example: jack543!'
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
            placeholder='Example: jack@email.com'
            onChange={(e) => { handleInputChange(e.target.value, 'email') }}
            required
          />
          <Typography variant='body2'>
            For authentication reasons, you will not be emailed
          </Typography>
        </Box>
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

export default AnswerForm
