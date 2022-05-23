import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'

const size = ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide']
const width = ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide']
const comfort = ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect']
const quality = ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect']
const length = ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']
const fit = ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']

const formObj = {
  size: { values: size, name: 'Size' },
  width: { values: width, name: 'Width' },
  comfort: { values: comfort, name: 'Comfort' },
  quality: { values: quality, name: 'Quality' },
  length: { values: length, name: 'Length' },
  fit: { values: fit, name: 'Fit' },
}

const FormCharacteristics = ({ onInputChange }) => {
  return (
    <Box sx={{ px: 2, py: 1, border: 1, borderRadius: 1 }}>
      <Typography sx={{ textAlign: 'center' }}>
        Characteristics Choice
      </Typography>
      {Object.keys(formObj).map((id) => (
        <Box key={id} sx={{ py: 1, display: 'flex', flexDirection: 'column' }}>
          <FormControl>
            <FormLabel>{formObj[id].name}</FormLabel>
            <RadioGroup row>
              {formObj[id].values.map((value, ind) => (
                <FormControlLabel
                  key={value}
                  sx={{ flex: 1 }}
                  value={ind + 1}
                  control={
                    <Radio required size='small' onChange={(e) => onInputChange(e.target.value, id)} />
                  }
                  label={
                    <Typography variant='body2'>{value}</Typography>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Divider />
        </Box>
      ))}
    </Box>
  )
}

export default FormCharacteristics
