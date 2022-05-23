import { styled } from '@mui/material/styles'
import {
  Button,
  IconButton,
  Stack,
} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { uploadImage } from 'api/image'
import { useStore } from 'store'

const Input = styled('input')({
  display: 'none',
})

const UploadImages = ({ onPhotoUpload }) => {
  const { openAlert } = useStore()

  const handleFileChange = (file) => {
    uploadImage(file)
      .then(({ data }) => {
        const url = data.data.image.url
        onPhotoUpload(url)
      })
      .catch(err => {
        console.log(err)
        openAlert(err.response.data)
      })
  }

  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <label htmlFor='contained-button-file'>
        <Input accept='image/*' id='contained-button-file' multiple type='file' onChange={(e) => handleFileChange(e.target.files[0])} />
        <Button variant='contained' component='span'>
          Upload
        </Button>
      </label>
      <label htmlFor='icon-button-file'>
        <Input accept='image/*' id='icon-button-file' type='file' onChange={(e) => handleFileChange(e.target.files[0])} />
        <IconButton color='primary' aria-label='upload picture' component='span'>
          <PhotoCamera />
        </IconButton>
      </label>
    </Stack>
  )
}

export default UploadImages
