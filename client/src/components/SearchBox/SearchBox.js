import {
  InputAdornment,
  TextField,
} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

const SearchBox = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type='search'
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchRoundedIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchBox
