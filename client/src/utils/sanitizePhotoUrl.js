import fill from '../assets/broken-image.png'

const sanitizePhotoUrl = (photo) => {
  return {
    url: photo.url || fill,
    thumbnail_url: photo.thumbnail_url || fill,
  }
}

export default sanitizePhotoUrl
