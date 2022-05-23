import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

const CustomDialog = ({ open, onClose, title, maxWidth, fullScreen, children }) => {
  const titleVariant = fullScreen ? 'h5' : 'h6'

  return (
    <Dialog maxWidth={maxWidth} fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle>
        <Typography component='div' variant={titleVariant} color='primary.main'>
          {title}
        </Typography>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'primary.main' }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog
