import { Box, Button, Center, Heading, Input } from '@chakra-ui/react'
import { useRef } from 'react'

function Drop() {
  const chooseFileRef = useRef<HTMLInputElement>(null)

  const onChooseFileHandler = () => {
    chooseFileRef.current?.click()
  }

  return (
    <Box as="section">
      <Center flexDirection="column" h="300px" pos="relative">
        <Box
          as="canvas"
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
          left={0}
          top={0}
          opacity={0.5}
          w="100%"
          h="100%"
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
}

export default Drop
