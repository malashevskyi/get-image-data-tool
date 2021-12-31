import { Box, Button, Center, Input } from '@chakra-ui/react'
import { useContext, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { mainActions } from '../../store'

const ChooseImage = ({ btnName }: { btnName: string }) => {
  const chooseFileRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const onChooseFileHandler = () => {
    chooseFileRef.current?.click()
  }

  const fileInputChnageHandler = () => {
    if (chooseFileRef.current?.files) {
      const { 0: file } = chooseFileRef.current.files

      const blobUrl = URL.createObjectURL(file)

      const image = new Image()
      image.src = blobUrl

      image.onload = () => {
        dispatch(mainActions.reset())
        dispatch(mainActions.newImageUrl(blobUrl))
        dispatch(
          mainActions.newImageSize({ width: image.width, height: image.height })
        )
        dispatch(mainActions.newImage(image))
      }
    }
  }

  return (
    <Box pos="relative" zIndex={4}>
      <Input
        type="file"
        onChange={fileInputChnageHandler}
        visibility="hidden"
        pos="absolute"
        ref={chooseFileRef}
      ></Input>
      <Button colorScheme="blue" onClick={onChooseFileHandler}>
        Choose new file
      </Button>
    </Box>
  )
}

export default ChooseImage
