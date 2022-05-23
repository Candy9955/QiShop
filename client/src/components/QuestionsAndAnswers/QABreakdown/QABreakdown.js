import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Typography,
} from '@mui/material'
import {
  getAnswers,
  addAnswer,
  answerHelpful,
  reportAnswer,
} from 'api/qa'
import Question from '../Question'
import Answer from '../Answer'

const QABreakdown = ({
  productId, productName, question, keyword,
  onQuestionHelpfulClick, onQuestionReportClick,
}) => {
  const [expanded, setExpanded] = useState(false)
  const [answers, setAnswers] = useState(Object.values(question.answers))

  const { question_id: questionId } = question

  const page = 1
  const count = answers.length
  const displayCount = 2

  // filter by search keyword
  let answersFiltered = answers.slice()
  if (keyword.length > 2) {
    answersFiltered = answersFiltered.filter(x => x.body.toLowerCase().includes(keyword.toLowerCase()))
  }

  const answersDisplayed = expanded ? answersFiltered : answersFiltered.slice(0, displayCount)

  useEffect(() => {
    setExpanded(false)
  }, [productId])

  const refreshAnswers = (questionId, page, count) => {
    getAnswers(questionId, page, count).then(({ data }) => {
      data = data.results
      // console.log('@@ getAnswers', questionId, data)
      data = data.map(answer => {
        answer.id = answer.answer_id
        answer.photos = answer.photos.map(photo => photo.url)
        return answer
      })
      setAnswers(data)
    })
  }

  const handleAnswerSubmit = (answer) => {
    // console.log(answer)
    addAnswer(questionId, answer)
      .then(() => {
        refreshAnswers(questionId, page, count + 1)
      })
      .catch((error) => {
        console.log(error)
        console.log(error.response.data.errors)
      })
  }

  const handleAnswerHelpfulClick = (answerId) => {
    answerHelpful(answerId).then(() => {
      refreshAnswers(questionId, page, count)
    })
  }
  const handleAnswerReportClick = (answerId) => {
    reportAnswer(answerId).then(() => {
      refreshAnswers(questionId, page, count)
    })
  }

  const handleMoreAnswersClick = () => setExpanded(true)
  const handleCollapseAnswersClick = () => setExpanded(false)

  return (
    <Box key={questionId} sx={{ pt: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ mr: 1 }} fontWeight='bold'>Q: </Typography>
        <Question
          productName={productName}
          question={question}
          keyword={keyword}
          onQuestionHelpfulClick={onQuestionHelpfulClick}
          onQuestionReportClick={onQuestionReportClick}
          onAnswerSubmit={handleAnswerSubmit}
        />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ mr: 1 }} fontWeight='bold'>A: </Typography>
        <Box>
          {answersDisplayed.map((answer) => (
            <Box key={answer.id} sx={{ mb: 1 }}>
              <Answer
                answer={answer}
                keyword={keyword}
                onAnswerHelpfulClick={handleAnswerHelpfulClick}
                onAnswerReportClick={handleAnswerReportClick}
              />
            </Box>
          ))}
          {!expanded && answersFiltered.length > displayCount &&
            <Button sx={{ px: 0, fontWeight: 'bold' }} onClick={handleMoreAnswersClick}>
              More Answers
            </Button>
          }
          {expanded &&
            <Button sx={{ px: 0, fontWeight: 'bold' }} onClick={handleCollapseAnswersClick}>
              Collapse Answers
            </Button>
          }
        </Box>
      </Box>
    </Box>
  )
}

export default QABreakdown
