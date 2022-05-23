import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

const SortMenu = ({ reviews, onSortChange }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography>
        <strong>{reviews.length} </strong> reviews, sorted by
      </Typography>
      <FormControl sx={{ ml: 1, minWidth: 120 }} size='small'>
        <InputLabel>Sort</InputLabel>
        <Select
          defaultValue='helpful'
          label='Sort'
          onChange={(e) => { onSortChange(e.target.value) }}
        >
          <MenuItem value='helpful'>Helpful</MenuItem>
          <MenuItem value='newest'>Newest</MenuItem>
          <MenuItem value='relevant'>Relevant</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SortMenu
