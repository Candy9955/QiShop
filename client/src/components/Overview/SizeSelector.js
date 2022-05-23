import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import {
  addToCart,
  getCart,
} from 'api/cart'
import { useStore } from 'store'

const SizeSelector = ({ currentStyle }) => {
  const { openAlert, setCart } = useStore()

  const [skuPicked, setSkuPicked] = useState('')
  const [qtyPicked, setQtyPicked] = useState('')

  const purchaseLimit = 10

  const skuQtyLeft = Object.entries(currentStyle.skus)
    .filter((item) => item[0] === skuPicked)
    .map((item) => item[1].quantity)[0] || 0

  const qtyAllowed = Math.min(skuQtyLeft, purchaseLimit)

  useEffect(() => {
    setSkuPicked('')
    setQtyPicked('')
  }, [currentStyle])

  const refreshCart = () => {
    getCart().then(({ data }) => {
      // console.log('@@ getCart', data)
      setCart(data)
    }).catch(err => {
      openAlert(err.response.data)
    })
  }

  const handleAddToCartClick = () => {
    if (skuPicked && qtyPicked) {
      // console.log(skuPicked, qtyPicked)
      const addItemsToCart = []
      for (let i = 0; i < qtyPicked; i += 1) {
        addItemsToCart.push(addToCart(skuPicked))
      }
      Promise.all(addItemsToCart).then(() => {
        refreshCart()
      }).catch(err => {
        openAlert(err.response.data)
      })
    }
  }

  return (
    <Box>
      <Box sx={{ pb: 2, display: 'flex', alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 120, pr: 2 }} size='small'>
          <InputLabel>Size</InputLabel>
          <Select
            label='Size'
            value={skuPicked}
            onChange={(e) => setSkuPicked(e.target.value)}
          >
            {Object.entries(currentStyle.skus).filter((item) => item[1].quantity > 0)
              .map((item) => (
                <MenuItem
                  key={item[0]}
                  value={item[0]}
                >
                  {item[1].size}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 80 }} size='small'>
          <InputLabel>Qty</InputLabel>
          <Select
            label='Qty'
            value={qtyPicked}
            onChange={(e) => setQtyPicked(e.target.value)}
          >
            {[...Array(qtyAllowed).keys()]
              .map(num => (
                <MenuItem
                  key={num + 1}
                  value={num + 1}
                >
                  {num + 1}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        sx={{ p: 1, width: '60%', fontWeight: 'bold', fontSize: 16 }}
        variant='contained'
        onClick={handleAddToCartClick}
      >
        Add To Cart
      </Button>
    </Box>
  )
}

export default SizeSelector
