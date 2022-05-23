import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import calcAvgRating from 'utils/calcAvgRating'
import { StarRating } from 'components/Stars'

const CompareTable = ({ currentProductBundle, comparedProductBundle }) => {
  const {
    product: currentProduct,
    productStyles: currentProductStyles,
    reviewsMeta: currentReviewsMeta
  } = currentProductBundle

  const {
    product: comparedProduct,
    productStyles: comparedProductStyles,
    reviewsMeta: comparedReviewsMeta
  } = comparedProductBundle

  const header = [currentProduct.name, '', comparedProduct.name]

  const productFuncs = [
    { name: 'Category', func: (product) => product.category },
    { name: 'Price', func: (product) => '$' + product.default_price },
  ]

  const styleFuncs = [
    { name: 'Styles', func: (styles) => styles.length },
  ]

  const reviewFuncs = [
    {
      name: 'Rating', func: (meta) => {
        const rating = calcAvgRating(meta).avgRating
        return <StarRating ratingValue={rating} size='small' showNumber={true} />
      }
    },
    { name: 'Reviews', func: (meta) => calcAvgRating(meta).count },
    {
      name: 'Recommended', func: (meta) => {
        const yes = Number(meta.recommended.true || 0)
        const no = Number(meta.recommended.false || 0)
        if (yes + no === 0)
          return
        else
          return Number(yes / (yes + no) * 100).toFixed(0) + '%'
      }
    },
  ]

  const currFeat = currentProduct.features.map(({ feature }) => feature)
  const compFeat = comparedProduct.features.map(({ feature }) => feature)
  const features = currFeat.concat(compFeat.filter(x => !currFeat.includes(x)))

  const featureFuncs = features.map((feat) => (
    {
      name: feat, func: (product) => {
        const res = product.features.find(({ feature }) => feature === feat)
        return res?.value
      }
    }
  ))

  const currChar = Object.keys(currentReviewsMeta.characteristics)
  const compChar = Object.keys(comparedReviewsMeta.characteristics)
  const characteristics = currChar.concat(compChar.filter(x => !currChar.includes(x)))

  const characteristicFuncs = characteristics.map((char) => (
    {
      name: char, func: (meta) => {
        let rating = meta.characteristics[char]?.value
        rating = rating && Number(rating).toFixed(1)
        return rating && <StarRating ratingValue={rating} size='small' showNumber={true} />
      }
    }
  ))

  let body = []

  body = body.concat(
    productFuncs.map(({ name, func }) => [func(currentProduct), name, func(comparedProduct)])
  )

  body = body.concat(
    styleFuncs.map(({ name, func }) => [func(currentProductStyles), name, func(comparedProductStyles)])
  )

  body = body.concat(
    reviewFuncs.map(({ name, func }) => [func(currentReviewsMeta), name, func(comparedReviewsMeta)])
  )

  body = body.concat(
    featureFuncs.map(({ name, func }) => [func(currentProduct), name, func(comparedProduct)])
  )

  body = body.concat(
    characteristicFuncs.map(({ name, func }) => [func(currentReviewsMeta), name, func(comparedReviewsMeta)])
  )

  return (
    <TableContainer>
      <Table stickyHeader size='medium'>
        <TableHead>
          <TableRow>
            {header.map((cell, index) => (
              <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((row, index) => (
            <TableRow key={index} hover>
              {row.map((cell, index) => (
                <TableCell key={index}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CompareTable
