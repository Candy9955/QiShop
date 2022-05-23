import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useStore } from 'store'

const Cart = () => {
  const { cart } = useStore()

  const totalSku = cart.length
  const totalQty = cart.reduce((res, x) => res += Number(x.count), 0)

  return (
    <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
      <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component='h1' variant='h4' align='center'>
          Shopping Cart
        </Typography>
        <TableContainer>
          <Table stickyHeader size='medium'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Item SKU</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map(({ sku_id, count }) => (
                <TableRow key={sku_id} hover>
                  <TableCell>{sku_id}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))}
              <TableRow hover>
                <TableCell sx={{ fontWeight: 'bold' }}>Total: {totalSku}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total: {totalQty}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            sx={{ mt: 3, ml: 1 }}
            component={RouterLink}
            to='/checkout'
          >
            Check out
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Cart
