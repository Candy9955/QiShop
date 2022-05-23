import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material'

const QuestionForm = ({ productId, productName, onQuestionSubmit }) => {
  const [question, setQuestion] = useState({ product_id: productId })

  const handleInputChange = (value, fieldName) => {
    setQuestion(prevObj => {
      const obj = { ...prevObj }
      obj[fieldName] = value
      return obj
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    onQuestionSubmit(question)
  }

  return (
    <form style={{ flex: 1 }} onSubmit={handleFormSubmit}>
      <Typography sx={{ pb: 1 }}>
        About the <strong>{productName}</strong>
      </Typography>
      <Box sx={{ pb: 3, display: 'flex', flexDirection: 'column' }}>
        <TextField
          label='Your Question'
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
      <Box sx={{ pb: 3, display: 'flex', justifyContent: 'center' }}>
        <Button type='submit' variant='contained'>Submit</Button>
      </Box>
    </form>
  )
}

export default QuestionForm
