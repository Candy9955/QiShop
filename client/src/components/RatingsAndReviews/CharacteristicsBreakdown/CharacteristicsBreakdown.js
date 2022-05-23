import {
  Box,
  Typography,
} from '@mui/material'
import CharacteristicsBar from './CharacteristicsBar'

const CharacteristicsBreakdown = ({ characteristics }) => {
  const keys = Object.keys(characteristics).slice();
  const types = ['Size', 'Width', 'Quality', 'Length', 'Fit', 'Comfort'];
  const size = ['Too small', 'Perfect', 'Too wide'];
  const width = ['Too narrow', 'Perfect', 'Too wide'];
  const comfort = ['Poor', 'Ok', 'Perfect'];
  const quality = ['Poor', 'Expected', 'Perfect'];
  const length = ['Short', 'Perfect', 'Long'];
  const fit = ['Tight', 'Perfect', 'Long'];
  const obj = {
    size, width, comfort, quality, length, fit,
  };

  return (
    <Box>
      {
        types.map((type) => (
          keys.includes(type) ? (
            <Box key={type} sx={{ my: 2 }}>
              <Typography variant='body2' sx={{ textAlign: 'center' }}>
                How do you like the {type}?
              </Typography>
              <CharacteristicsBar value={characteristics[type].value / 5 * 100} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='body2'>{obj[type.toLowerCase()][0]}</Typography>
                <Typography variant='body2'>{obj[type.toLowerCase()][1]}</Typography>
                <Typography variant='body2'>{obj[type.toLowerCase()][2]}</Typography>
              </Box>
            </Box>
          ) : null
        ))
      }
    </Box >
  )
}

CharacteristicsBreakdown.defaultProps = {
  characteristics: {},
}

export default CharacteristicsBreakdown
