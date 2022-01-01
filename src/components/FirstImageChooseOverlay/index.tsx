import { Box, Center, VStack } from '@chakra-ui/react'
import ChooseImage from '../ChooseImage'

const FirstImageChooseOverlay = () => {
  return (
    <VStack
      justifyContent="center"
      pos="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
    >
      {/* overlay */}
      <Box
        bg="gray.900"
        pos="absolute"
        left="4px"
        top="4px"
        zIndex={3}
        opacity={0.5}
        w="calc(100% - 8px)"
        h="calc(100% - 8px)"
      ></Box>

      {/* drop title */}
      <Center
        fontSize="20px"
        color="white"
        d="inline-block"
        mb={2}
        zIndex={4}
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
      <ChooseImage btnName="Choose file" />
    </VStack>
  )
}

export default FirstImageChooseOverlay
