import { useState } from 'react'
import {
  Box,
  Rating,
  Typography,
} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
}

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

const StarRatingHover = ({ onInputChange, size }) => {
  const [value, setValue] = useState(4)
  const [hover, setHover] = useState(-1)

  let typography = 'body1'
  if (size === 'small') {
    typography = 'body2'
  }

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        size={size}
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(e, newValue) => {
          setValue(newValue)
          onInputChange(e.target.value, 'rating')
        }}
        onChangeActive={(e, newHover) => {
          setHover(newHover)
        }}
        emptyIcon={
          <StarBorderIcon sx={{ color: 'rating.main' }} fontSize='inherit' />
        }
      />
      {value !== null && (
        <Typography sx={{ ml: 2 }} variant={typography}>
          {labels[hover !== -1 ? hover : value]}
        </Typography>
      )}
    </Box>
  )
}

export default StarRatingHover
