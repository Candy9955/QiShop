import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'

const FormRecommend = ({ onInputChange }) => {
  return (
    <Box>
      <Typography variant='body2'>
        Do you recommend this product?
      </Typography>
      <Box sx={{ px: 2, border: 1, borderRadius: 1 }}>
        <FormControl>
          <RadioGroup row>
            <FormControlLabel
              value='yes'
              control={
                <Radio required size='small' onChange={(e) => onInputChange(e.target.value, 'recommend')} />
              }
              label={
                <Typography variant='body2'>Yes</Typography>
              }
            />
            <FormControlLabel
              value='no'
              control={
                <Radio required size='small' onChange={(e) => onInputChange(e.target.value, 'recommend')} />
              }
              label={
                <Typography variant='body2'>No</Typography>
              }
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  )
}

export default FormRecommend
