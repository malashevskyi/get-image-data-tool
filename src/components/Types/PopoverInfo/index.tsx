import { InfoIcon } from '@chakra-ui/icons'
import {
  Badge,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'

const PopoverInfo = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <InfoIcon
          cursor="pointer"
          color="blue.500"
          w="25px"
          h="25px"
          mx={4}
          transition="color 0.25s ease"
          _hover={{ color: 'blue.600' }}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>...</PopoverHeader>
        <PopoverBody>
          You can control <Badge>R G B A</Badge> only with options that include
          <Badge>X</Badge> and <Badge>Y</Badge> coordinates; otherwise, you will
          copy all image data{' '}
          <Badge letterSpacing={1.2}>IMAGE.WIDTH * IMAGE.HEIGHT</Badge>
          <br />
          With rgba control you can easily get rid of an image background, or
          some image part you don't need. <br />
          (e.g. if you have the red (255, 0, 0) background, you can decrease a
          little bit <Badge>R</Badge> value and all red particles will be
          removed.) <br />
          You can find more information on{' '}
          <Link
            isExternal={true}
            color="blue.500"
            href="https://github.com/malashevskyi/get-image-data-tool"
          >
            github
          </Link>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverInfo
