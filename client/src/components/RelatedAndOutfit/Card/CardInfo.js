import {
  Box,
  Divider,
  Typography,
} from '@mui/material'

const CardInfo = ({ productStyles }) => {
  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='body2'>
        <strong>{productStyles.length}</strong> styles available
      </Typography>
      {productStyles.map(({ style_id, name, original_price, sale_price }) => (
        <Box key={style_id} sx={{ mt: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', typography: 'caption' }}>
            <Typography variant='inherit'>{name}: </Typography>
            <Box sx={{ flex: 1, px: 1 }}></Box>
            {sale_price ? (
              <Box sx={{ display: 'flex' }}>
                <Typography variant='inherit' sx={{ textDecoration: 'line-through', pr: 0.5 }}>${original_price}</Typography>
                <Typography variant='inherit' sx={{ color: 'error.main' }}>${sale_price}</Typography>
              </Box>
            ) : (
              <Typography variant='inherit'>${original_price}</Typography>
            )}
          </Box>
          <Divider sx={{ mt: 0.5 }} />
        </Box>
      ))}
    </Box>
  )
}

export default CardInfo
