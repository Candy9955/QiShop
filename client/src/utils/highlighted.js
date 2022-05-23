import { Box } from '@mui/material'

const highlighted = (text, highlight) => {
  // start highlight when user typed in 3 or more characters
  if (highlight.length < 3) {
    return text
  }
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'i'))
  return (
    <Box component='span'>
      {parts.map((part, i) => (
        <Box
          key={i}
          component='span'
          sx={part.toLowerCase() === highlight.toLowerCase() ?
            { color: 'search.contrastText', bgcolor: 'search.main' } : {}
          }
        >
          {part}
        </Box>
      ))}
    </Box>
  )
}

export default highlighted
