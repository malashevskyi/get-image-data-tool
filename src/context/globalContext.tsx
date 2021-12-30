import { createContext, useState } from 'react'

type StateType = {
  canvasChooseSize: {
    width: number | null
    height: number | null
  }
}

const initialState: StateType = {
  canvasChooseSize: { width: null, height: null },
}

function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>

  const defaultUpdate: UpdateType = () => defaultValue

  return createContext({
    state: defaultValue,
    dispatch: defaultUpdate,
  })
}

export const GlobalContext = createCtx(initialState)

const GlobalContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useState(initialState)

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
