import { Box } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import DataControls from './components/DataControls'
import Drop from './components/Drop'
import ImageCanvas from './components/ImageCanvas'
import Title from './components/Title'
import Types from './components/Types'
import { RootState } from './store'

function App() {
  const canvasChoose = useRef<HTMLCanvasElement>(null)
  const state = useSelector((state: RootState) => state.root)
  let offsetTick = 0
  let canvasGradient: CanvasGradient | null = null
  const RAF = useRef<number | null>(null)

  useEffect(() => {
    animate()

    return () => {
      if (RAF.current) {
        cancelAnimationFrame(RAF.current)
      }
    }
  }, [state.canvasChooseSize])

  function animate() {
    RAF.current = requestAnimationFrame(animate)

    imageChooseCanvasAnimate()
  }
  function imageChooseCanvasAnimate() {
    const { width, height } = state.canvasChooseSize
    if (!canvasChoose.current || !width || !height) return

    const context = canvasChoose.current.getContext(
      '2d'
    ) as CanvasRenderingContext2D
    context.clearRect(0, 0, width, height)

    if (!canvasGradient) {
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

      canvasGradient = grd
    }

    canvasChoose.current.setAttribute('width', width + 'px')
    canvasChoose.current.setAttribute('height', height + 'px')

    if (offsetTick >= 28) offsetTick = 0
    offsetTick += 0.5

    context.beginPath()
    context.rect(0, 0, width, height)
    context.lineWidth = 4
    if (canvasGradient) {
      context.strokeStyle = canvasGradient
    }
    context.setLineDash([7, 7])
    context.lineDashOffset = offsetTick

    context.stroke()
    context.closePath()
  }

  return (
    <Box pos="relative" overflow="hidden" w="calc(100% - 4px)" ml="2px">
      <Title />
      <Drop ref={canvasChoose} />
      <Types />
      <DataControls />
      <ImageCanvas />
    </Box>
  )
}

export default App
