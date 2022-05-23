import {
  Box,
  Tooltip,
  Typography,
} from '@mui/material'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import CardList from './CardList'

const RelatedList = ({ relatedProductsBundle, onCompareClick, onRelatedProductClick }) => {
  return (
    <Box>
      <Typography fontWeight='bold'>RELATED PRODUCTS</Typography>
      <CardList
        productsBundle={relatedProductsBundle}
        topIcon={
          <Tooltip title='Compare Products' placement='top'>
            <StarBorderRoundedIcon />
          </Tooltip>
        }
        onTopIconClick={onCompareClick}
        onImageClick={onRelatedProductClick}
      />
    </Box>
  )
}

export default RelatedList
