import { useState } from 'react'
import {
  Box,
  Button,
  MobileStepper,
} from '@mui/material'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'

const ImageCarousel = ({ styleImages, thumbImageIdx }) => {
  const [imageIndex, setImageIndex] = useState(thumbImageIdx)
  const mainImageUrl = styleImages[imageIndex].url

  const handlePrevImage = () => {
    setImageIndex(prevIndex => (prevIndex > 0) ? prevIndex - 1 : styleImages.length - 1)
  }

  const handleNextImage = () => {
    setImageIndex(prevIndex => (prevIndex < styleImages.length - 1) ? prevIndex + 1 : 0)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src={mainImageUrl}
        alt='main'
        loading='lazy'
        style={{ objectFit: 'scale-down', width: '100%', height: '100%', borderRadius: 4 }}
      />
      <MobileStepper
        variant='dots'
        steps={styleImages.length}
        activeStep={imageIndex}
        backButton={
          <Button onClick={handlePrevImage}>
            <KeyboardArrowLeftRoundedIcon />
            Back
          </Button>
        }
        nextButton={
          <Button onClick={handleNextImage}>
            Next
            <KeyboardArrowRightRoundedIcon />
          </Button>
        }
      />
    </Box >
  )
}

export default ImageCarousel
