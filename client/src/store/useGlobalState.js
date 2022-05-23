import { useState, useMemo } from 'react'

export const useGlobalState = () => {
  const [colorMode, setColorMode] = useState('light')
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState()
  const [cart, setCart] = useState([])

  const toggleColorMode = useMemo(() =>
    () => {
      setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    },
    []
  )

  const openAlert = useMemo(() =>
    (text) => {
      setAlertText(text)
      setAlertOpen(true)
    },
    []
  )

  const closeAlert = useMemo(() =>
    () => {
      setAlertOpen(false)
    },
    []
  )

  return {
    colorMode,
    toggleColorMode,
    alertOpen,
    alertText,
    openAlert,
    closeAlert,
    cart,
    setCart,
  }
}
