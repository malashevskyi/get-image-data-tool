import { Center } from '@chakra-ui/react'
import { RefObject, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mainActions, RootState } from '../../store'

class Particle {
  x: number
  y: number
  r: number
  g: number
  b: number
  a?: number
  color: string
  context: CanvasRenderingContext2D

  constructor({
    context,
    x,
    y,
    r,
    b,
    g,
    a,
  }: {
    context: CanvasRenderingContext2D
    x: number
    y: number
    r: number
    g: number
    b: number
    a?: number
  }) {
    this.x = x
    this.y = y
    this.r = r
    this.g = g
    this.b = b
    this.a = a
    this.context = context

    this.color =
      this.a !== undefined ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`
  }

  draw() {
    this.context.beginPath()
    this.context.fillStyle = this.color
    this.context.fillRect(this.x, this.y, 1, 1)
    this.context.closePath()
  }
}

const ImageCanvas = () => {
  const state = useSelector((state: RootState) => state.root)
  const dispatch = useDispatch()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const copyDataRef = useRef<string | null>(null)

  const addStrToCopyData = useCallback(
    (x: number, y: number, r: number, g: number, b: number, a: number) => {
      let d = ''
      switch (state.copyDataType) {
        case 'rgb':
          d = `[${r},${g},${b}]`
          break
        case 'rgba':
          d = `[${r},${g},${b},${a}]`
          break
        case 'xyrgb':
          d = `[${x},${y},${r},${g},${b}]`
          break
        case 'xyrgba':
          d = `[${x},${y},${r},${g},${b},${a}]`
          break
        case 'xy':
          d = `[${x},${y}]`
          break
      }
      if (copyDataRef.current && copyDataRef.current.length !== 0) {
        copyDataRef.current += `,${d}`
      } else {
        copyDataRef.current += d
      }
    },
    [copyDataRef, state.copyDataType]
  )

  const animate = useCallback(() => {
    if (!canvasRef.current || !state.image) return

    const context = canvasRef.current.getContext(
      '2d'
    ) as CanvasRenderingContext2D
    const { width, height } = context.canvas

    context.clearRect(0, 0, width, height)

    if (!state.imageDataUpdated) {
      context.drawImage(state.image, 0, 0, width, height)
      const imageData = context.getImageData(0, 0, width, height).data
      dispatch(mainActions.setImageData(Array.from(imageData)))

      if (!width) return

      const particles = []

      for (let i = 0; i < imageData.length; i += 4) {
        const x = (i % (width * 4)) / 4
        const y = Math.floor(i / (width * 4))

        const r = imageData[i]
        const g = imageData[i + 1]
        const b = imageData[i + 2]
        const a = Math.floor((imageData[i + 3] / 255) * 100) / 100

        if (i === 0) {
          copyDataRef.current = ''
        }

        switch (state.copyDataType) {
          case 'rgb':
            particles.push(new Particle({ context, x, y, r, g, b }))
            addStrToCopyData(x, y, r, g, b, a)
            break
          case 'rgba':
            particles.push(new Particle({ context, x, y, r, g, b, a }))
            addStrToCopyData(x, y, r, g, b, a)
            break
          case 'xyrgb':
            if (a < 1) break

            if (
              r >= state.channels.r[0] &&
              r <= state.channels.r[1] &&
              g >= state.channels.g[0] &&
              g <= state.channels.g[1] &&
              b >= state.channels.b[0] &&
              b <= state.channels.b[1]
            ) {
              addStrToCopyData(x, y, r, g, b, a)
              particles.push(new Particle({ context, x, y, r, g, b }))
            }
            break
          case 'xyrgba':
            if (a === 0) break

            if (
              r >= state.channels.r[0] &&
              r <= state.channels.r[1] &&
              g >= state.channels.g[0] &&
              g <= state.channels.g[1] &&
              b >= state.channels.b[0] &&
              b <= state.channels.b[1] &&
              a >= state.channels.a[0] &&
              a <= state.channels.a[1]
            ) {
              particles.push(new Particle({ context, x, y, r, g, b, a }))
              addStrToCopyData(x, y, r, g, b, a)
            }
            break
          case 'xy':
            if (a === 0) break
            if (
              r >= state.channels.r[0] &&
              r <= state.channels.r[1] &&
              g >= state.channels.g[0] &&
              g <= state.channels.g[1] &&
              b >= state.channels.b[0] &&
              b <= state.channels.b[1] &&
              a >= state.channels.a[0] &&
              a <= state.channels.a[1]
            ) {
              addStrToCopyData(x, y, r, g, b, a)
              particles.push(new Particle({ context, x, y, r, g, b, a }))
            }
            break
          default:
            break
        }

        if (i === imageData.length - 4) {
          dispatch(mainActions.addToCopyData(copyDataRef.current))
        }
      }

      dispatch(mainActions.setParticles(particles))
    }

    state.particles.forEach((particle) => {
      particle.draw()
    })
  }, [
    addStrToCopyData,
    dispatch,
    state.channels.a,
    state.channels.b,
    state.channels.g,
    state.channels.r,
    state.copyDataType,
    state.image,
    state.imageDataUpdated,
    state.particles,
  ])

  useEffect(() => {
    animate()
  }, [
    state.image,
    state.imageDataUpdated,
    state.channels,
    state.copyDataType,
    animate,
  ])

  return (
    <Center as="section" pos="relative" overflow="hidden" mb={7}>
      {state.imageSize.height && state.imageSize.width && (
        <canvas
          width={state.imageSize.width || '300px'}
          height={state.imageSize.height || '150px'}
          ref={
            canvasRef as RefObject<HTMLDivElement> &
              RefObject<HTMLCanvasElement>
          }
          style={{
            backgroundColor: 'black',
          }}
        ></canvas>
      )}
    </Center>
  )
}

export default ImageCanvas
