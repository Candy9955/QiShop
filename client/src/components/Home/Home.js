import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import {
  getProduct,
  getProductStyles,
  getRelatedProductIds,
} from 'api/products'
import { getReviewsMeta } from 'api/reviews'
import { useStore } from 'store'
import Loading from '../Loading'
import Overview from '../Overview'
import RelatedAndOutfit from '../RelatedAndOutfit'
import QuestionsAndAnswers from '../QuestionsAndAnswers'
import RatingsAndReviews from '../RatingsAndReviews'

const Home = () => {
  const { openAlert } = useStore()

  const [product, setProduct] = useState()
  const [productStyles, setProductStyles] = useState()
  const [reviewsMeta, setReviewsMeta] = useState()
  const [relatedProductsBundle, setRelatedProductsBundle] = useState([])

  const { productId: routerProductId } = useParams()
  const defaultProductId = 66642
  const productId = Number(routerProductId) || defaultProductId

  useEffect(() => {
    refreshProductBundle(productId)
    refreshRelatedProductsBundle(productId)
  }, [productId])

  const getProductBundle = (productId) => {
    return Promise.all([
      getProduct(productId),
      getProductStyles(productId),
      getReviewsMeta(productId),
    ]).then(values => {
      const bundle = {
        product: values[0].data,
        productStyles: values[1].data.results,
        reviewsMeta: values[2].data,
      }
      // console.log('@@ getProductBundle', productId, bundle)
      return bundle
    }).catch(err => {
      openAlert(err.response.data)
    })
  }

  const refreshProductBundle = async (productId) => {
    let bundle = relatedProductsBundle.find(({ product }) => product.id === productId)
    bundle = bundle || (await getProductBundle(productId))
    if (bundle) {
      const { product, productStyles, reviewsMeta } = bundle
      setProduct(product)
      setProductStyles(productStyles)
      setReviewsMeta(reviewsMeta)
    }
  }

  const refreshRelatedProductsBundle = (productId) => {
    getRelatedProductIds(productId).then(({ data }) => {
      // deduplicate product ids
      const relatedIds = data.filter((x, i) => !data.includes(x, i + 1))
      // console.log('@@ getRelatedProductIds', productId, relatedIds)
      const getRelatedBundles = relatedIds.map(productId => getProductBundle(productId))

      Promise.all(getRelatedBundles).then(values => {
        values = values.filter(value => !!value)
        setRelatedProductsBundle(values)
      })
    }).catch(err => {
      openAlert(err.response.data)
    })
  }

  const overviewReady = Boolean(product && productStyles)
  const relatedReady = Boolean(product && productStyles)
  const qaReady = Boolean(product)
  const reviewReady = Boolean(reviewsMeta)

  // MUI uses a recommended 8px scaling factor by default.
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        px: {
          xs: '5%',
          sm: '5%',
          md: '10%',
          lg: '15%',
          xl: '20%',
          xxl: '25%',
        },
      }}
    >
      <Box sx={{ mt: 2, mb: 3 }}>
        {overviewReady ? (
          <Overview
            product={product}
            productStyles={productStyles}
            reviewsMeta={reviewsMeta}
          />
        ) : <Loading />}
      </Box>
      <Box sx={{ my: 3 }}>
        {relatedReady ? (
          <RelatedAndOutfit
            product={product}
            productStyles={productStyles}
            reviewsMeta={reviewsMeta}
            relatedProductsBundle={relatedProductsBundle}
          />
        ) : <Loading />}
      </Box>
      <Box sx={{ my: 3 }}>
        {qaReady ? (
          <QuestionsAndAnswers
            product={product}
          />
        ) : <Loading />}
      </Box>
      <Box id='ratings' sx={{ my: 3 }}>
        {reviewReady ? (
          <RatingsAndReviews
            reviewsMeta={reviewsMeta}
          />
        ) : <Loading />}
      </Box>
    </Box>
  )
}

export default Home
