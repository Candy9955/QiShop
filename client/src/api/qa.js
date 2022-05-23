const axios = require('axios')

export const getQuestions = (productId, page, count) => {
  const options = {
    url: '/api/qa/questions',
    method: 'get',
    params: {
      product_id: productId,
      page,
      count,
    },
  }
  return axios(options)
}

export const getAnswers = (questionId, page, count) => {
  const options = {
    url: `/api/qa/questions/${questionId}/answers`,
    method: 'get',
    params: {
      page,
      count,
    },
  }
  return axios(options)
}

export const addQuestion = (newQuestion) => {
  const options = {
    url: '/api/qa/questions',
    method: 'post',
    data: newQuestion,
  }
  return axios(options)
}

export const addAnswer = (questionId, newAnswer) => {
  const options = {
    url: `/api/qa/questions/${questionId}/answers`,
    method: 'post',
    data: newAnswer,
  }
  return axios(options)
}

export const questionHelpful = (questionId) => {
  const options = {
    url: `/api/qa/questions/${questionId}/helpful`,
    method: 'put',
  }
  return axios(options)
}

export const reportQuestion = (questionId) => {
  const options = {
    url: `/api/qa/questions/${questionId}/report`,
    method: 'put',
  }
  return axios(options)
}

export const answerHelpful = (answerId) => {
  const options = {
    url: `/api/qa/answers/${answerId}/helpful`,
    method: 'put',
  }
  return axios(options)
}

export const reportAnswer = (answerId) => {
  const options = {
    url: `/api/qa/answers/${answerId}/report`,
    method: 'put',
  }
  return axios(options)
}
