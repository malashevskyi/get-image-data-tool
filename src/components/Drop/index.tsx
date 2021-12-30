import { Box, Button, Center, Heading, Input } from '@chakra-ui/react'
import { forwardRef, RefObject, useContext, useEffect, useRef } from 'react'
import { GlobalContext } from '../../context/globalContext'

const Drop = forwardRef((_, ref) => {
  const chooseFileRef = useRef<HTMLInputElement>(null)
  const chooseSectionRef = useRef<HTMLDivElement>(null)
  const { state, dispatch } = useContext(GlobalContext)

  useEffect(() => {
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [chooseSectionRef.current])

  const onChooseFileHandler = () => {
    chooseFileRef.current?.click()
  }

  function updateCanvasSize() {
    if (chooseSectionRef.current) {
      const width = chooseSectionRef.current.clientWidth
      const height = chooseSectionRef.current.clientHeight
      dispatch({ ...state, canvasChooseSize: { width, height } })
    }
  }

  return (
    <Box as="section">
      <Center
        flexDirection="column"
        h="300px"
        pos="relative"
        ref={chooseSectionRef}
      >
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
        {/* overlay */}
        <Box
          bg="gray.900"
          pos="absolute"
          left="4px"
          top="4px"
          opacity={0.5}
          w="calc(100% - 8px)"
          h="calc(100% - 8px)"
        ></Box>
        <Center
          fontSize="20px"
          // bg="gray.300"
          color="white"
          d="inline-block"
          mb={2}
          zIndex={1}
          textTransform="uppercase"
          pos="relative"
          _before={{
            content: "''",
            pos: 'absolute',
            w: '100%',
            h: '100%',
            bg: 'gray.900',
            opacity: 0.5,
          }}
        >
          <Box pos="relative" zIndex={2} p={4}>
            Drag and drop a file here or
          </Box>
        </Center>
        <Input
          type="file"
          visibility="hidden"
          pos="absolute"
          ref={chooseFileRef}
        ></Input>
        <Button colorScheme="blue" onClick={onChooseFileHandler}>
          Choose file
        </Button>
      </Center>
    </Box>
  )
})

export default Drop
