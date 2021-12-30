import { Box } from '@chakra-ui/react'
import { useContext, useEffect, useRef, useState } from 'react'
import Drop from './components/Drop'
import Title from './components/Title'
import { GlobalContext } from './context/globalContext'

function App() {
  const canvasChoose = useRef<HTMLCanvasElement>(null)
  const { state } = useContext(GlobalContext)
  const [canvasGradient, setCanvasGradient] = useState<CanvasGradient | null>(
    null
  )
  const offsetTick = useRef<number>(0)
  const RAF = useRef<number | null>(null)

  useEffect(() => {
    animate()

    return () => {
      if (RAF.current) {
        cancelAnimationFrame(RAF.current)
      }
    }
  }, [state])

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

      setCanvasGradient(grd)
    }

    canvasChoose.current.setAttribute('width', width + 'px')
    canvasChoose.current.setAttribute('height', height + 'px')

    if (offsetTick.current >= 28) offsetTick.current = 0
    offsetTick.current += 0.5

    context.beginPath()
    context.rect(0, 0, width, height)
    context.lineWidth = 4
    if (canvasGradient) {
      context.strokeStyle = canvasGradient
    }
    context.setLineDash([7, 7])
    context.lineDashOffset = offsetTick.current

    context.stroke()
    context.closePath()
  }

  return (
    <Box pos="relative" overflow="hidden" w="100vw">
      <Title />

      <Drop ref={canvasChoose} />
    </Box>
  )
}

export default App
