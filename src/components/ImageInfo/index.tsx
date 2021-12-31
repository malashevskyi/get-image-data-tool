import { Badge, Box, Center, List, ListItem } from '@chakra-ui/react'
import { forwardRef, RefObject, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mainActions, RootState } from '../../store'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const ImageInfo = forwardRef((_, ref) => {
  const state = useSelector((state: RootState) => state.root)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('image data', state.imageData)
  }, [state.imageData])

  return (
    <Box>
      {/* <SyntaxHighlighter language="javascript" style={docco}>
        {`
        image data size : ${state.imageDataSize}
        image width : ${state.imageSize.width}
        image height : ${state.imageSize.height}`}
      </SyntaxHighlighter> */}
      <List spacing={3} mb={4}>
        <ListItem>
          image data size : <Badge>{state.imageDataSize}</Badge>
        </ListItem>
        <ListItem>
          image width : <Badge>{state.imageSize.width}</Badge>
        </ListItem>
        <ListItem>
          image height : <Badge>{state.imageSize.height}</Badge>
        </ListItem>
        <ListItem>
          particles count : <Badge>{state.particlesCount}</Badge>
        </ListItem>
      </List>
    </Box>
  )
})

export default ImageInfo
