import { Box, Center, Flex } from '@chakra-ui/react'
import { forwardRef, RefObject, useEffect, useRef, useState } from 'react'
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
  const RAF = useRef<number | null>(null)
  const rgbaControls = { r: [0, 255], g: [0, 255], b: [0, 255], a: [0, 1] }
  let copyData = ''

  // useEffect(() => {
  //   console.log('state', state)
  //   const { width, height } = state.imageSize
  // }, [state])

  useEffect(() => {
    // console.log('____________', state.image)
    animate()
    return () => {
      if (RAF.current) {
        cancelAnimationFrame(RAF.current)
      }
    }
  }, [state.image, state.imageDataUpdated])

  function addStrToCopyData(
    x: number,
    y: number,
    r: number,
    g: number,
    b: number,
    a: number
  ) {
    // console.log('copydatatype', state.copyDataType)
    let d
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
    // dispatch(mainActions.addToCopyData(d))
    // console.log('copyData', copyData)
    if (copyData.length !== 0) {
      copyData += `,${d}`
    } else {
      copyData += d
    }
  }

  function animate() {
    RAF.current = requestAnimationFrame(animate)

    if (!canvasRef.current || !state.image) return

    const context = canvasRef.current.getContext(
      '2d'
    ) as CanvasRenderingContext2D
    const { width, height } = context.canvas

    // if (!width || !height) return

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
          copyData = ''
        }
        addStrToCopyData(x, y, r, g, b, a)
        // console.log(i, imageData.length)
        if (i === imageData.length - 4) {
          // console.log('dispatch')
          dispatch(mainActions.addToCopyData(copyData))
        }

        switch (state.copyDataType) {
          case 'rgb':
            particles.push(new Particle({ context, x, y, r, g, b }))
            break
          case 'rgba':
            particles.push(new Particle({ context, x, y, r, g, b, a }))
            break
          case 'xyrgb':
            if (a < 1) break

            if (
              r >= rgbaControls.r[0] &&
              r <= rgbaControls.r[1] &&
              g >= rgbaControls.g[0] &&
              g <= rgbaControls.g[1] &&
              b >= rgbaControls.b[0] &&
              b <= rgbaControls.b[1]
            ) {
              particles.push(new Particle({ context, x, y, r, g, b }))
            }
            break
          case 'xyrgba':
            if (a === 0) break

            if (
              r >= rgbaControls.r[0] &&
              r <= rgbaControls.r[1] &&
              g >= rgbaControls.g[0] &&
              g <= rgbaControls.g[1] &&
              b >= rgbaControls.b[0] &&
              b <= rgbaControls.b[1] &&
              a >= rgbaControls.a[0] &&
              a <= rgbaControls.a[1]
            ) {
              particles.push(new Particle({ context, x, y, r, g, b, a }))
            }
            break
          case 'xy':
            if (a === 0) break
            if (
              r >= rgbaControls.r[0] &&
              r <= rgbaControls.r[1] &&
              g >= rgbaControls.g[0] &&
              g <= rgbaControls.g[1] &&
              b >= rgbaControls.b[0] &&
              b <= rgbaControls.b[1] &&
              a >= rgbaControls.a[0] &&
              a <= rgbaControls.a[1]
            ) {
              particles.push(new Particle({ context, x, y, r, g, b, a }))
            }
            break
          default:
            break
        }

        // copyDataButton.disabled = false
      }

      dispatch(mainActions.setParticles(particles))
    }

    if (state.particles.length === 0) {
      // clear copy data
      // displayImageData();
    }
    state.particles.forEach((particle) => {
      particle.draw()
    })
  }

  return (
    <Center as="section" pos="relative" overflow="hidden">
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
