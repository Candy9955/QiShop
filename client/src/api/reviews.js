const axios = require('axios')

export const getReviews = (page, count, sort, productId) => {
  const options = {
    url: '/api/reviews',
    method: 'get',
    params: {
      page,
      count,
      sort,
      product_id: productId,
    },
  }
  return axios(options)
}

export const getReviewsMeta = (productId) => {
  const options = {
    url: '/api/reviews/meta',
    method: 'get',
    params: {
      product_id: productId,
    },
  }
  return axios(options)
}

export const createNewReview = (newReview) => {
  const options = {
    url: '/api/reviews',
    method: 'post',
    data: newReview,
  }
  return axios(options)
}

export const reviewHelpful = (reviewId) => {
  const options = {
    url: `/api/reviews/${reviewId}/helpful`,
    method: 'put',
  }
  return axios(options)
}

export const reportReview = (reviewId) => {
  const options = {
    url: `/api/reviews/${reviewId}/report`,
    method: 'put',
  }
  return axios(options)
}
