import { Heading, Link } from '@chakra-ui/react'

function Fork() {
  return (
    <Heading mt={4} textAlign="center">
      <Link
        href="https://github.com/malashevskyi/get-image-data-tool"
        isExternal={true}
        bg="black"
        color="white"
        fontSize="12px"
        textTransform="uppercase"
        pos="absolute"
        top="-35px"
        right="-85px"
        px="50px"
        py={2}
        transform="rotate(45deg)"
        transformOrigin="0% 50%"
        zIndex={3}
      >
        fork me on github
      </Link>
    </Heading>
  )
}

export default Fork
