import { Box, Center, Flex } from '@chakra-ui/react'
import { forwardRef, RefObject, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mainActions, RootState } from '../../store'

const ImageCanvas = () => {
  const state = useSelector((state: RootState) => state.root)
  const dispatch = useDispatch()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const RAF = useRef<number | null>(null)

  // useEffect(() => {
  //   console.log('state', state)
  //   const { width, height } = state.imageSize
  // }, [state])

  useEffect(() => {
    console.log('____________', state.image)
    animate()
    return () => {
      if (RAF.current) {
        cancelAnimationFrame(RAF.current)
      }
    }
  }, [state.image, state.imageDataUpdated])

  function animate() {
    RAF.current = requestAnimationFrame(animate)

    if (!canvasRef.current || !state.image) return

    const context = canvasRef.current.getContext(
      '2d'
    ) as CanvasRenderingContext2D
    const width = context.canvas.width
    const height = context.canvas.height

    context.clearRect(0, 0, width, height)

    context.drawImage(state.image, 0, 0, width, height)
    const imageData = context.getImageData(0, 0, width, height).data

    if (!state.imageDataUpdated) {
      console.log(
        'here',
        state.imageDataUpdated,
        state.imageData,
        Array.from(imageData)
      )
      dispatch(mainActions.setImageData(Array.from(imageData)))
    }
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
