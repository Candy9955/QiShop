const axios = require('axios')

export const getProduct = (productId) => {
  const options = {
    url: `/api/products/${productId}`,
    method: 'get',
  }
  return axios(options)
}

export const getProductStyles = (productId) => {
  const options = {
    url: `/api/products/${productId}/styles`,
    method: 'get',
  }
  return axios(options)
}

export const getRelatedProductIds = (productId) => {
  const options = {
    url: `/api/products/${productId}/related`,
    method: 'get',
  }
  return axios(options)
}
