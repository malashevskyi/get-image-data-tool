import { Box, Heading } from '@chakra-ui/react'
import Fork from '../Fork'

function Header() {
  return (
    <Box as="header" pt={4} zIndex={5} pos="relative">
      <Heading as="h1" textAlign="center">
        Get image data for canvas
      </Heading>
      <Box as="p" maxW="400px" mx="auto" textAlign="center">
        Don't use big images because every image pixel renders in canvas, so
        it'll freeze the page. Good for not big images, icons, text of few words
        and so on.
      </Box>
      <Fork />
    </Box>
  )
}

export default Header
