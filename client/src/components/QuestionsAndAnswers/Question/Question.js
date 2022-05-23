import { useState } from 'react'
import {
  Box,
  Chip,
  Divider,
  Link,
  Typography,
} from '@mui/material'
import highlighted from 'utils/highlighted'
import CustomDialog from 'components/CustomDialog'
import AnswerForm from '../AnswerForm'

const Question = ({
  productName, question, keyword,
  onQuestionHelpfulClick, onQuestionReportClick, onAnswerSubmit,
}) => {
  const [open, setOpen] = useState(false)

  const {
    question_id: questionId,
    question_body: questionBody,
    // question_date: questionDate,
    // asker_name: askerName,
    question_helpfulness: questionHelpfulness,
  } = question

  const handleAddAnswerClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box sx={{ flex: 1, display: 'flex' }}>
      <Typography fontWeight='bold'>
        {highlighted(questionBody, keyword)}
      </Typography>
      <Box sx={{ flex: 1 }}></Box>
      <Box sx={{ pb: 1, display: 'flex', alignItems: 'center' }}>
        <Chip
          size='small'
          variant='outlined'
          color='primary'
          label={`Helpful (${questionHelpfulness})`}
          onClick={() => onQuestionHelpfulClick(questionId)}
        />
        <Divider sx={{ mx: 2 }} orientation='vertical' flexItem />
        <Link
          component='button'
          color='primary'
          onClick={() => handleAddAnswerClick(questionId)}
        >
          Add Answer
        </Link>
      </Box>
      <CustomDialog
        open={open}
        onClose={handleClose}
        title='Submit Your Answer'
        maxWidth='md'
      >
        <AnswerForm
          productName={productName}
          questionBody={questionBody}
          onAnswerSubmit={onAnswerSubmit}
        />
      </CustomDialog>
    </Box >
  )
}

export default Question
