import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
} from '@mui/material'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import CustomDialog from 'components/CustomDialog'
import ImageCarousel from './ImageCarousel'

const ImageGallery = ({ styleImages }) => {
  const [thumbImageIdx, setThumbImageIdx] = useState(0)
  const [open, setOpen] = useState(false)
  const mainImageUrl = styleImages[thumbImageIdx].url

  const slideRef = useRef()

  const slideUp = () => {
    slideRef.current.scrollTop -= 250
  }

  const slideDown = () => {
    slideRef.current.scrollTop += 250
  }

  const handleThumbImageClick = (index) => {
    setThumbImageIdx(index)
  }

  const handlePrevImage = () => {
    setThumbImageIdx(prevIndex => (prevIndex > 0) ? prevIndex - 1 : prevIndex)
  }

  const handleNextImage = () => {
    setThumbImageIdx(prevIndex => (prevIndex < styleImages.length - 1) ? prevIndex + 1 : prevIndex)
  }

  const handleMainImageClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    setThumbImageIdx(0)
    setOpen(false)
  }, [styleImages])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flex: 1, py: 1, pr: 2, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton sx={{ position: 'absolute', top: -15, zIndex: 1 }} onClick={slideUp}>
          <KeyboardArrowUpRoundedIcon fontSize='large' />
        </IconButton>
        <ImageList
          ref={slideRef}
          cols={1}
          gap={16}
          sx={{ maxHeight: '60vh', scrollBehavior: 'smooth' }}
        >
          {styleImages.map((style, index) => (
            <ImageListItem key={style.thumbnail_url}>
              <Button
                color='primary'
                sx={{ p: 0, border: 1.5, '&:hover': { opacity: 0.5 } }}
                onClick={() => handleThumbImageClick(index)}
              >
                <img
                  src={style.thumbnail_url}
                  alt='thumbnail'
                  loading='lazy'
                  style={{ aspectRatio: 1, objectFit: 'cover', width: '100%', maxHeight: '100%' }}
                />
              </Button>
            </ImageListItem>
          ))}
        </ImageList>
        <IconButton sx={{ position: 'absolute', bottom: -15, zIndex: 1 }} onClick={slideDown}>
          <KeyboardArrowDownRoundedIcon fontSize='large' />
        </IconButton>
      </Box>
      <Box sx={{ flex: 7, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton sx={{ position: 'absolute', left: 0 }} onClick={handlePrevImage}>
          <ArrowBackIosRoundedIcon />
        </IconButton>
        <Box onClick={handleMainImageClick}>
          <img
            src={mainImageUrl}
            alt='main'
            loading='lazy'
            style={{ objectFit: 'contain', width: '100%', maxHeight: '70vh', borderRadius: 4 }}
          />
        </Box>
        <IconButton sx={{ position: 'absolute', right: 0 }} onClick={handleNextImage}>
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </Box>
      <CustomDialog
        open={open}
        onClose={handleClose}
        title='EVERLINE'
        fullScreen
      >
        <ImageCarousel styleImages={styleImages} thumbImageIdx={thumbImageIdx} />
      </CustomDialog>
    </Box>
  )
}

export default ImageGallery
