import {
  Box,
  Tooltip,
  Typography,
} from '@mui/material'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import CardList from './CardList'

const OutfitList = ({ outfitProductsBundle, onAddToOutfitClick, onRemoveFromOutfitClick }) => {
  return (
    <Box>
      <Typography fontWeight='bold'>YOUR OUTFIT</Typography>
      <CardList
        productsBundle={outfitProductsBundle}
        topIcon={
          <Tooltip title='Remove from Outfit' placement='top'>
            <HighlightOffRoundedIcon />
          </Tooltip>
        }
        onTopIconClick={onRemoveFromOutfitClick}
        includeEmptyCard
        onEmptyCardClick={onAddToOutfitClick}
      />
    </Box>
  )
}

export default OutfitList
