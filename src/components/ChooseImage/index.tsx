import { Box, Button, Input } from '@chakra-ui/react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { mainActions } from '../../store'

const ChooseImage = ({ btnName }: { btnName: string }) => {
  const chooseFileRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const onChooseFileHandler = () => {
    chooseFileRef.current?.click()
  }

  const fileInputChangeHandler = () => {
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
        onChange={fileInputChangeHandler}
        visibility="hidden"
        pos="absolute"
        ref={chooseFileRef}
      ></Input>
      <Button colorScheme="blue" onClick={onChooseFileHandler}>
        {btnName}
      </Button>
    </Box>
  )
}

export default ChooseImage
