import { Box, Center, VStack } from '@chakra-ui/react'
// import { useContext, useRef } from 'react'
// import { useDispatch } from 'react-redux'
// import { mainActions } from '../../store'
import ChooseImage from '../ChooseImage'

const FirstImageChooseOverlay = () => {
  // const chooseFileRef = useRef<HTMLInputElement>(null)
  // const dispatch = useDispatch()

  // const onChooseFileHandler = () => {
  //   chooseFileRef.current?.click()
  // }

  // const fileInputChnageHandler = () => {
  //   if (chooseFileRef.current?.files) {
  //     const { 0: file } = chooseFileRef.current.files

  //     const blobUrl = URL.createObjectURL(file)

  //     const image = new Image()
  //     image.src = blobUrl

  //     image.onload = () => {
  //       dispatch(mainActions.newImageUrl(blobUrl))
  //       dispatch(
  //         mainActions.newImageSize({ width: image.width, height: image.height })
  //       )
  //       dispatch(mainActions.newImage(image))
  //     }
  //   }
  // }

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
      {/* <Input
        type="file"
        onChange={fileInputChnageHandler}
        visibility="hidden"
        pos="absolute"
        ref={chooseFileRef}
      ></Input>
      <Button
        colorScheme="blue"
        pos="relative"
        zIndex={4}
        onClick={onChooseFileHandler}
      >
        Choose file
      </Button> */}
    </VStack>
  )
}

export default FirstImageChooseOverlay
