import { Box, Heading } from '@chakra-ui/react'
import Fork from '../Fork'

function Title() {
  return (
    <Box as="header" pt={4} zIndex={5} pos="relative">
      <Heading textAlign="center">Get image data for canvas</Heading>
      <Fork />
    </Box>
  )
}

export default Title
