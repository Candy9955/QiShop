import {
  Box,
  CircularProgress,
  Typography,
} from '@mui/material'

const Loading = ({ text }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography>{text}</Typography>
      <CircularProgress />
    </Box>
  )
}

export default Loading
