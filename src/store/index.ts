import { configureStore, createSlice } from '@reduxjs/toolkit'

type StateType = {
  canvasChooseSize: {
    width: number | null
    height: number | null
  }
  imageUrl: string | null
  image: HTMLImageElement | null
  imageSize: {
    width: string | null
    height: string | null
  }
  imageData: number[]
  imageDataUpdated: boolean
  imageDataSize: string
  particlesCount: number
  particles: any[]
  copyDataType: string
  copyData: string
}

const initialState: StateType = {
  canvasChooseSize: { width: null, height: null },
  imageUrl: null,
  image: null,
  imageSize: {
    width: null,
    height: null,
  },
  imageData: [],
  imageDataUpdated: false,
  imageDataSize: '0KB',
  particlesCount: 0,
  particles: [],
  copyDataType: 'xyrgb',
  copyData: '',
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    reset(state) {
      state.canvasChooseSize.width = null
      state.canvasChooseSize.height = null
      state.imageUrl = null
      state.image = null
      state.imageSize.width = null
      state.imageSize.height = null
      state.imageData = []
      state.imageDataUpdated = false
      state.imageDataSize = '0KB'
      state.particlesCount = 0
      state.particles = []
      state.copyDataType = 'xyrgb'
      state.copyData = ''
    },
    newImageUrl(state, action) {
      state.imageUrl = action.payload
    },
    setCanvasGradientSize(state, action) {
      state.canvasChooseSize.width = action.payload.width
      state.canvasChooseSize.height = action.payload.height
    },
    newImageSize(state, action) {
      state.imageSize.width = action.payload.width + 'px'
      state.imageSize.height = action.payload.height + 'px'
    },
    newImage(state, action) {
      state.image = action.payload
    },
    setImageData(state, action) {
      state.imageDataUpdated = true
      // console.log('here start, action', state.imageDataUpdated, action.payload)
      state.imageData = action.payload

      let size = action.payload.length / 1024
      if (size) {
        size += 4
        state.imageDataSize = Math.round(size) + ' KB'
      }
    },
    setParticlesCount(state, action) {
      state.particlesCount = action.payload
    },
    setParticles(state, action) {
      state.particles = action.payload
      state.particlesCount = action.payload.length
    },
    changeCopyDataType(state, action) {
      state.copyDataType = action.payload
    },
    addToCopyData(state, action) {
      state.copyData = action.payload
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
