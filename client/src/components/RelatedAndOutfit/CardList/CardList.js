import { useRef } from 'react'
import {
  Box,
  IconButton,
  ImageList,
} from '@mui/material'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import { ImageCard, EmptyCard } from '../Card'
import Loading from 'components/Loading'

const CardList = ({
  productsBundle, topIcon, includeEmptyCard = false,
  onEmptyCardClick, onTopIconClick, onImageClick,
}) => {
  const slideRef = useRef()

  const slideLeft = () => {
    slideRef.current.scrollLeft -= 250
  }

  const slideRight = () => {
    slideRef.current.scrollLeft += 250
  }

  const listReady = productsBundle

  return (
    listReady ? (
      <Box sx={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
        <IconButton sx={{ position: 'absolute', left: 0, zIndex: 1 }} onClick={slideLeft}>
          <ArrowBackIosRoundedIcon />
        </IconButton>
        <ImageList
          ref={slideRef}
          gap={16}
          sx={{ scrollBehavior: 'smooth' }}
          cols={productsBundle.length + (includeEmptyCard ? 1 : 0)}
        >
          {includeEmptyCard &&
            <EmptyCard onIconClick={onEmptyCardClick} />
          }
          {
            productsBundle.map((bundle) => {
              const { product, productStyles, reviewsMeta } = bundle
              // console.log(product, productStyles, reviewsMeta)
              const cardReady = productStyles?.length > 0
              return (
                cardReady ? (
                  <ImageCard
                    key={product.id}
                    product={product}
                    productStyles={productStyles}
                    reviewsMeta={reviewsMeta}
                    topIcon={topIcon}
                    onTopIconClick={onTopIconClick}
                    onImageClick={onImageClick}
                  />
                ) : <Loading key={product.id} />
              )
            })
          }
        </ImageList>
        <IconButton sx={{ position: 'absolute', right: 0, zIndex: 1 }} onClick={slideRight}>
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </Box>
    ) : <Loading />
  )
}

export default CardList
