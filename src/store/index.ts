import { configureStore, createSlice } from '@reduxjs/toolkit'

type StateType = {
  canvasChooseSize: {
    width: number | null
    height: number | null
  }
  imageUrl: string | null
}

const initialState: StateType = {
  canvasChooseSize: { width: null, height: null },
  imageUrl: null,
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    newImageUrl(state, action) {
      state.imageUrl = action.payload
    },
    setCanvasGradientSize(state, action) {
      state.canvasChooseSize.width = action.payload.width
      state.canvasChooseSize.height = action.payload.height
    },
  },
})

export const mainActions = mainSlice.actions
const store = configureStore({
  reducer: {
    root: mainSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export default store
export type RootState = ReturnType<typeof store.getState>
