import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Box,
  Button,
  Typography,
} from '@mui/material'
import {
  getQuestions,
  addQuestion,
  questionHelpful,
  reportQuestion,
} from 'api/qa'
import QABreakdown from './QABreakdown'
import QuestionForm from './QuestionForm'
import Loading from '../Loading'
import CustomDialog from '../CustomDialog'
import SearchBox from '../SearchBox'
import { useStore } from 'store'

const PAGE_SIZE = 2

const QuestionsAndAnswers = ({ product }) => {
  const { openAlert } = useStore()

  const page = 1
  const [questions, setQuestions] = useState([])
  const [count, setCount] = useState(PAGE_SIZE)
  const [open, setOpen] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('qa') || ''

  const { id: productId, name: productName } = product

  // filter by search keyword
  let questionsDisplayed = questions.slice()
  if (keyword.length > 2) {
    questionsDisplayed = questionsDisplayed.filter(question => {
      const { answers } = question
      const questionMatch = question.question_body.toLowerCase().includes(keyword.toLowerCase())
      const answersMatch = Object.values(answers).reduce(
        (res, answer) => res || answer.body.toLowerCase().includes(keyword.toLowerCase())
        , false)
      return questionMatch || answersMatch
    })
  }

  useEffect(() => {
    setCount(PAGE_SIZE)
  }, [productId])

  useEffect(() => {
    refreshQuestions(productId, page, count)
  }, [productId, page, count])

  const refreshQuestions = (productId, page, count) => {
    getQuestions(productId, page, count).then(({ data }) => {
      data = data.results
      // console.log('@@ getQuestions', productId, data)
      setQuestions(data)
    }).catch(err => {
      openAlert(err.response.data)
    })
  }

  const handleSearchChange = (value) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('qa', value)
    setSearchParams(newSearchParams)
  }

  const handleQuestionHelpfulClick = (questionId) => {
    questionHelpful(questionId).then(() => {
      refreshQuestions(productId, page, count)
    }).catch(err => {
      openAlert(err.response.data)
    })
  }

  const handleQuestionReportClick = (questionId) => {
    reportQuestion(questionId).then(() => {
      console.log(`Reported questionId ${questionId} successfully`)
      refreshQuestions(productId, page, count)
    }).catch(err => {
      openAlert(err.response.data)
    })
  }

  const handleMoreQuestionsClick = () => {
    setCount(prevCount => prevCount > questions.length ? prevCount : prevCount + PAGE_SIZE)
  }

  const handleQuestionSubmit = (question) => {
    addQuestion(question).then(() => {
      refreshQuestions(productId, page, count)
    }).catch(err => {
      openAlert(err.response.data)
    })
  }

  const handleAddQuestionClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    questions ? (
      <Box>
        <Typography variant='body1' fontWeight='bold'>QUESTIONS & ANSWERS</Typography>
        <Box sx={{ mt: 2 }}>
          <SearchBox
            label='Have a question? Search for answers...'
            value={keyword}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2, maxHeight: '70vh', overflow: 'auto' }}>
          {questionsDisplayed.map((question) => (
            <QABreakdown
              key={question.question_id}
              productId={productId}
              productName={productName}
              question={question}
              keyword={keyword}
              onQuestionHelpfulClick={handleQuestionHelpfulClick}
              onQuestionReportClick={handleQuestionReportClick}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex' }}>
          {count <= questions?.length &&
            <Button sx={{ mr: 2, fontWeight: 'bold' }} variant='outlined' onClick={handleMoreQuestionsClick}>
              More Answered Questions
            </Button>
          }
          <Button sx={{ fontWeight: 'bold' }} variant='outlined' onClick={handleAddQuestionClick}>
            Add A Question +
          </Button>
        </Box>
        <CustomDialog
          open={open}
          onClose={handleClose}
          title='Ask Your Question'
          maxWidth='md'
        >
          <QuestionForm
            productId={productId}
            productName={productName}
            onQuestionSubmit={handleQuestionSubmit}
          />
        </CustomDialog>
      </Box>
    ) : <Loading />
  )
}

export default QuestionsAndAnswers
