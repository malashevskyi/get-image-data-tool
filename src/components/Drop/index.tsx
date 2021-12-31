import { Box, Center, Flex, HStack, VStack } from '@chakra-ui/react'
import { forwardRef, RefObject, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mainActions, RootState } from '../../store'
import ChooseImage from '../ChooseImage'
import CopyImageData from '../CopyImageData'
import FirstImageChooseOverlay from '../FirstImageChooseOverlay'
import ImageInfo from '../ImageInfo'
import DropActive from './DropActive'

const Drop = forwardRef((_, ref) => {
  const chooseSectionRef = useRef<HTMLDivElement>(null)
  const [isDropActive, setIsDropActive] = useState<boolean>(false)
  const state = useSelector((state: RootState) => state.root)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('STATE', state.imageUrl, state.canvasChooseSize)
  }, [state])

  // choose image canvas animation
  useEffect(() => {
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [chooseSectionRef.current])

  // prevent drop image in document (it opens image in new tab)
  useEffect(() => {
    document.addEventListener('drop', preventDocumentImageDrop)

    return () => {
      document.removeEventListener('drop', preventDocumentImageDrop)
    }
  }, [])

  // choose image handler
  useEffect(() => {
    if (!state.imageUrl) return

    // dispatch(
    //   mainActions.setParticlesCount(
    //     state.canvasChooseSize.width * state.canvasChooseSize.height
    //   )
    // )

    // remove active drag/drop overlay
    removeOverlay()
  }, [state.imageUrl])

  // window drag event
  useEffect(() => {
    chooseSectionRef.current?.addEventListener('dragover', catchFileActivate)
    chooseSectionRef.current?.addEventListener('drop', onDropFileHandler)
    document.addEventListener('dragover', removeOverlay)

    return () => {
      chooseSectionRef.current?.removeEventListener(
        'dragover',
        catchFileActivate
      )
      chooseSectionRef.current?.removeEventListener('drop', onDropFileHandler)
      document.removeEventListener('dragover', removeOverlay)
    }
  }, [])

  function onDropFileHandler(event: DragEvent) {
    updateCanvasSize()
    const files = event.dataTransfer?.files
    if (!files) return
    const { 0: file } = files

    const blobUrl = URL.createObjectURL(file)

    const image = new Image()
    image.src = blobUrl

    image.onload = () => {
      dispatch(mainActions.newImageUrl(blobUrl))
      dispatch(
        mainActions.newImageSize({ width: image.width, height: image.height })
      )
      dispatch(mainActions.newImage(image))
    }
  }

  function preventDocumentImageDrop(event: DragEvent | MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
  }

  function catchFileActivate(event: DragEvent) {
    setIsDropActive(true)
  }

  function removeOverlay(event?: DragEvent | MouseEvent) {
    if (!event) {
      setIsDropActive(false)
      return
    }

    preventDocumentImageDrop(event)

    const position = document.elementFromPoint(event.clientX, event.clientY)
    if (
      position &&
      position !== chooseSectionRef.current &&
      !chooseSectionRef.current?.contains(position)
    ) {
      setIsDropActive(false)
    }
  }

  function updateCanvasSize() {
    if (!chooseSectionRef.current) return

    dispatch(
      mainActions.setCanvasGradientSize({
        width: chooseSectionRef.current.clientWidth,
        height: chooseSectionRef.current.clientHeight,
      })
    )
  }

  const canvasGradient = (
    <Box
      ref={
        ref as
          | ((
              | ((instance: HTMLDivElement | null) => void)
              | RefObject<HTMLDivElement>
            ) &
              RefObject<HTMLCanvasElement>)
          | null
      }
      as="canvas"
      id="canvasChoose"
      pos="absolute"
      left={0}
      top={0}
      w="100%"
      h="100%"
    ></Box>
  )

  return (
    <Box as="section">
      <Center
        flexDirection="column"
        h="300px"
        pos="relative"
        ref={chooseSectionRef}
      >
        {/* canvas dash animation */}
        {canvasGradient}

        {/* show overlay drop/choose until first image choose or drop */}
        {!state.imageUrl && <FirstImageChooseOverlay />}

        {/* loaded image info */}
        <VStack opacity={state.imageUrl ? 1 : 0.1}>
          <ImageInfo />
          <HStack spacing={2}>
            <ChooseImage btnName="Choose new file" />
            <CopyImageData />
          </HStack>
        </VStack>

        {/* overlay while drag/drop */}
        <DropActive visible={isDropActive} />
      </Center>
    </Box>
  )
})

export default Drop
