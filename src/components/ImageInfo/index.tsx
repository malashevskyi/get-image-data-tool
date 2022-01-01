import { Badge, Box, List, ListItem } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const ImageInfo = () => {
  const state = useSelector((state: RootState) => state.root)

  return (
    <Box>
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
}

export default ImageInfo
