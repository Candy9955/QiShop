import {
  Box,
  Typography,
} from '@mui/material'

const Price = ({ salePrice, origPrice }) => {
  return (
    salePrice ? (
      <Box sx={{ color: 'text.secondary' }} >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' sx={{ pr: 1, fontWeight: 'bold' }}>Was:</Typography>
          <Typography variant='body2' sx={{ fontWeight: 'bold', textDecoration: 'line-through' }}>${origPrice}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' sx={{ pr: 1, fontWeight: 'bold' }}>Deal:</Typography>
          <Typography sx={{ color: 'error.main', fontWeight: 'bold' }}>${salePrice}</Typography>
        </Box>
      </Box>
    ) : (
      <Typography sx={{ fontWeight: 'bold' }}>${origPrice}</Typography>
    )
  )
}

export default Price
