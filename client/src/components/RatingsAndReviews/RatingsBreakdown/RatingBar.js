import { useEffect, useState } from 'react'
import {
  Box,
  LinearProgress,
  Typography,
} from '@mui/material'

const RatingBar = ({
  productId, range, percentage, onRatingBarClick,
}) => {
  const [isSelected, setIsSelected] = useState(false)
  const selectSx = isSelected ?
    { bgcolor: 'secondary.main', color: 'secondary.contrastText' }
    : { '&:hover': { bgcolor: 'secondary.main', color: 'secondary.contrastText' } }

  const handleRatingBarClick = () => {
    setIsSelected(prevState => !prevState)
    onRatingBarClick(Number(range))
  }

  useEffect(() => {
    setIsSelected(false)
  }, [productId])

  return (
    <Box
      onClick={handleRatingBarClick}
      sx={{ display: 'flex', alignItems: 'center', '&:hover': { cursor: 'pointer' } }}
    >
      <Typography variant='body2' width={45} sx={selectSx} >
        {range} {range !== '1' ? 'stars' : 'star'}
      </Typography>
      <LinearProgress
        sx={{ flex: 1, mx: 2, height: 15, borderRadius: 1 }}
        variant='determinate'
        value={percentage}
      />
      <Typography variant='body2' width={30} align='right'>
        {Number(percentage).toFixed(0)}%
      </Typography>
    </Box>
  )
}

export default RatingBar
