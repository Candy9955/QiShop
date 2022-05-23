const axios = require('axios')

export const getCart = (productId) => {
  const options = {
    url: '/api/cart',
    method: 'get',
  }
  return axios(options)
}

export const addToCart = (skuId) => {
  const options = {
    url: '/api/cart',
    method: 'post',
    data: { sku_id: skuId },
  }
  return axios(options)
}
