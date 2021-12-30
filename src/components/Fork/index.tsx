import { Heading, Image, Link } from '@chakra-ui/react'
import logo from './logo.svg'

function Fork() {
  return (
    <Heading mt={4} textAlign="center">
      <Link>
        <Image
          pos="absolute"
          top={0}
          right={0}
          w="170px"
          h="170px"
          src={logo}
          alt="fork me"
        />
      </Link>
    </Heading>
  )
}

export default Fork
