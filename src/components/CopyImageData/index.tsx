import { Box, Button, Textarea } from '@chakra-ui/react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const CopyImageData = () => {
  const state = useSelector((state: RootState) => state.root)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const copyToClipboard = (text: string) => {
    if (!textAreaRef.current) return

    textAreaRef.current.value = state.copyData

    textAreaRef.current.select()
    document.execCommand('copy')
  }

  const onClickHandler = () => {
    if (!state.copyData) return

    copyToClipboard(`[${state.imageData}]`)
  }

  return (
    <Box>
      <Textarea
        pos="absolute"
        left="-10000px"
        top="-10000px"
        ref={textAreaRef}
      />
      <Button colorScheme="blue" onClick={onClickHandler}>
        Copy image data
      </Button>
    </Box>
  )
}

export default CopyImageData
