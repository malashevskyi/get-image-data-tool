import { Box } from '@chakra-ui/react'
import { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import CopyParticleCode from './components/CopyParticleCode'
import DataControls from './components/DataControls'
import Drop from './components/Drop'
import ImageCanvas from './components/ImageCanvas'
import Types from './components/Types'
import { RootState } from './store'
import Header from './components/Header'

function App() {
  const canvasChoose = useRef<HTMLCanvasElement>(null)
  const state = useSelector((state: RootState) => state.root)
  const offsetTick = useRef<number>(0)
  const canvasGradient = useRef<CanvasGradient | null>(null)
  const RAF = useRef<number | null>(null)

  const imageChooseCanvasAnimate = useCallback(() => {
    const { width, height } = state.canvasChooseSize
    if (!canvasChoose.current || !width || !height) return

    const context = canvasChoose.current.getContext(
      '2d'
    ) as CanvasRenderingContext2D
    context.clearRect(0, 0, width, height)

    if (!canvasGradient.current) {
      let grd = context.createLinearGradient(0, 0, width - 900, height)
      grd.addColorStop(0, `hsl(0, 50%, 50%)`)
      grd.addColorStop(0.1, `hsl(30, 50%, 50%)`)
      grd.addColorStop(0.2, `hsl(60, 50%, 50%)`)
      grd.addColorStop(0.3, `hsl(90, 50%, 50%)`)
      grd.addColorStop(0.4, `hsl(120, 50%, 50%)`)
      grd.addColorStop(0.5, `hsl(150, 50%, 50%)`)
      grd.addColorStop(0.6, `hsl(180, 50%, 50%)`)
      grd.addColorStop(0.7, `hsl(210, 50%, 50%)`)
      grd.addColorStop(0.8, `hsl(240, 50%, 50%)`)
      grd.addColorStop(0.9, `hsl(270, 50%, 50%)`)
      grd.addColorStop(1, `hsl(300, 50%, 50%)`)

      canvasGradient.current = grd
    }

    canvasChoose.current.setAttribute('width', width + 'px')
    canvasChoose.current.setAttribute('height', height + 'px')

    if (offsetTick.current >= 28) offsetTick.current = 0
    offsetTick.current += 0.5

    context.beginPath()
    context.rect(0, 0, width, height)
    context.lineWidth = 4
    if (canvasGradient.current) {
      context.strokeStyle = canvasGradient.current
    }
    context.setLineDash([7, 7])
    context.lineDashOffset = offsetTick.current

    context.stroke()
    context.closePath()
  }, [state.canvasChooseSize])

  const animate = useCallback(() => {
    if (RAF.current) {
      cancelAnimationFrame(RAF.current)
    }
    RAF.current = requestAnimationFrame(animate)

    imageChooseCanvasAnimate()
  }, [imageChooseCanvasAnimate])

  useEffect(() => {
    animate()
  }, [state.canvasChooseSize, state.imageDataUpdated, animate])

  return (
    <Box pos="relative" overflow="hidden" w="calc(100% - 4px)" ml="2px">
      <Header />
      <Drop ref={canvasChoose} />
      <Types />
      <CopyParticleCode />
      <DataControls />
      <ImageCanvas />
    </Box>
  )
}

export default App
