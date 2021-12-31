import { Box, Button, Center, Input } from '@chakra-ui/react'
import { useContext, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { mainActions } from '../../store'

const FirstImageChooseOverlay = () => {
  const chooseFileRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const onChooseFileHandler = () => {
    chooseFileRef.current?.click()
  }

  const fileInputChnageHandler = () => {
    if (chooseFileRef.current?.files) {
      const { 0: file } = chooseFileRef.current.files

      dispatch(mainActions.newImageUrl(URL.createObjectURL(file)))
    }
  }

  return (
    <>
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

      {/* drop title */}
      <Center
        fontSize="20px"
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
        onChange={fileInputChnageHandler}
        visibility="hidden"
        pos="absolute"
        ref={chooseFileRef}
      ></Input>
      <Button colorScheme="blue" onClick={onChooseFileHandler}>
        Choose file
      </Button>
    </>
  )
}

export default FirstImageChooseOverlay
