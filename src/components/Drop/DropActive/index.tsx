import { Box, Center } from '@chakra-ui/react'

type DropActiveProps = {
  visible: boolean
}

const DropActive = ({ visible }: DropActiveProps) => {
  return (
    <Center
      pos="absolute"
      zIndex={4}
      w="100%"
      h="100%"
      transition="opacity 0.4s ease"
      opacity={visible ? 1 : 0}
      pointerEvents={visible ? 'auto' : 'none'}
      _before={{
        content: "''",
        pos: 'absolute',
        left: '4px',
        top: '4px',
        w: 'calc(100% - 8px)',
        h: 'calc(100% - 8px)',
        bg: 'blue.400',
        opacity: 0.7,
      }}
    >
      <Center zIndex={2} w="100px" h="10px" bg="white">
        <Box h="100px" w="10px" bg="white"></Box>
      </Center>
    </Center>
  )
}

export default DropActive
