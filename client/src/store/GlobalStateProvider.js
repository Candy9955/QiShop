import { Context } from './Context'
import { useGlobalState } from './useGlobalState'

export const GlobalStateProvider = ({ children }) => {
  const state = useGlobalState()

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  )
}
