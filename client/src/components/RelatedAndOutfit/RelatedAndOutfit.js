import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { RelatedList, OutfitList } from './CardList'
import Loading from '../Loading'
import CustomDialog from '../CustomDialog'
import CompareTable from './CompareTable'

const RelatedAndOutfit = ({
  product, productStyles, reviewsMeta, relatedProductsBundle,
}) => {
  const [outfitProductsBundle, setOutfitProductsBundle] = useState([])
  const [comparedProductBundle, setComparedProductBundle] = useState({})
  const [open, setOpen] = useState(false)

  const currentProductBundle = { product, productStyles, reviewsMeta }

  const navigate = useNavigate()

  const handleRelatedProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const handleAddToOutfitClick = () => {
    setOutfitProductsBundle(prevBundle => {
      if (!prevBundle.map(({ product }) => product.id).includes(product.id)) {
        return prevBundle.concat(currentProductBundle)
      } else {
        return prevBundle
      }
    })
  }

  const handleRemoveFromOutfitClick = (productId) => {
    setOutfitProductsBundle(prevBundle => prevBundle.filter(({ product }) => product.id !== productId))
  }

  const handleCompareClick = (productId) => {
    const bundle = relatedProductsBundle.find(({ product }) => product.id === productId)
    setComparedProductBundle(bundle)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    relatedProductsBundle ? (
      <Box>
        <Box sx={{ mb: 6 }}>
          <RelatedList
            relatedProductsBundle={relatedProductsBundle}
            onRelatedProductClick={handleRelatedProductClick}
            onCompareClick={handleCompareClick}
          />
        </Box>
        <OutfitList
          outfitProductsBundle={outfitProductsBundle}
          onAddToOutfitClick={handleAddToOutfitClick}
          onRemoveFromOutfitClick={handleRemoveFromOutfitClick}
        />
        <CustomDialog
          open={open}
          onClose={handleClose}
          title='Products Compare'
          maxWidth='md'
        >
          <CompareTable
            currentProductBundle={currentProductBundle}
            comparedProductBundle={comparedProductBundle}
          />
        </CustomDialog>
      </Box>
    ) : <Loading />
  )
}

export default RelatedAndOutfit
