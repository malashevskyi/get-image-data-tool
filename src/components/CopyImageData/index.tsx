import { Box, Button, Center, Input } from '@chakra-ui/react'
import { useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mainActions, RootState } from '../../store'

const CopyImageData = () => {
  const chooseFileRef = useRef<HTMLInputElement>(null)
  const state = useSelector((state: RootState) => state.root)
  const dispatch = useDispatch()

  const copyToClipboard = (text: string) => {
    const dummy = document.createElement('textarea')
    document.body.appendChild(dummy)
    dummy.value = text
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)
  }

  const onClickHandler = () => {
    if (!state.imageData) return

    copyToClipboard(`[${state.imageData}]`)
  }

  return (
    <>
      <Button colorScheme="blue" onClick={onClickHandler}>
        Copy image data
      </Button>
    </>
  )
}

export default CopyImageData
