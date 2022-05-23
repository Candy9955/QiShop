import {
  Box,
  IconButton,
  Tooltip,
} from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useStore } from 'store'

const ColorModeButton = ({ size, color }) => {
  const { colorMode, toggleColorMode } = useStore()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* {colorMode} mode */}
      <Tooltip title={`Turn ${colorMode === 'dark' ? 'on' : 'off'} the light`}>
        <IconButton
          sx={{ ml: 1 }}
          size={size}
          color={color}
          onClick={toggleColorMode}
        >
          {colorMode === 'dark' ?
            <Brightness7Icon /> : <Brightness4Icon />
          }
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default ColorModeButton
