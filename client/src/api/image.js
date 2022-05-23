const axios = require('axios')

export const uploadImage = (file) => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('key', process.env.REACT_APP_IMGBB_API_KEY)

  const options = {
    url: 'https://api.imgbb.com/1/upload',
    method: 'post',
    data: formData,
    headers: {
      'content-type': 'multipart/form-data',
    },
  }

  return axios(options)
}
