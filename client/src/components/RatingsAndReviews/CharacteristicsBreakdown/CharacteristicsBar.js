import {
  Slider,
} from '@mui/material'

const CharacteristicsBar = ({ value }) => {
  return (
    <Slider
      sx={{
        py: 0,
        mt: 2,
        mb: 0.5,
        height: 8,
        '&.Mui-disabled': {
          color: 'primary.main',
        },
        '& .MuiSlider-thumb': {
          height: 15,
          width: 15,
          borderRadius: '25%',
        },
        '& .MuiSlider-mark': {
          height: 0.5,
        },
      }}
      disabled
      marks
      step={25}
      track={false}
      value={value}
      valueLabelDisplay='auto'
    />
  )
}

export default CharacteristicsBar
