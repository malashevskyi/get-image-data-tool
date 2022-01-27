import { Box, Button, Textarea, useToast, VStack } from '@chakra-ui/react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const copyCodeData = {
  particle() {
    return `class Particle {
constructor({ x, y, r, g, b, a, width, height, color }) {
  this.x = x;
  this.y = y;
  this.color = color ? color : \`rgba(\${r}\${r}\${b})\`;
  // this.color = color ? color : \`rgba(\${r}\${r}\${b}\${a})\`;
  this.width = width;
  this.height = height;
}

draw() {
  context.beginPath();
  context.fillStyle = this.color;
  context.rect(this.x, this.y, this.width, this.height);
  context.fill();
}
}`
  },
  rgb(width: number) {
    return `// import { imageData } from './imageData';

const image = {
width: ${width},
}

function getParticles() {
/* multiply x and y if you want to make big image
with visible pixels */
const scale = 1;

for (let i = 0; i < imageData.length; i++) {
  const [r, g, b, a] = imageData[i];
  
  particles.push(new Particle({
    x: i % (image.width) * scale,
    y: Math.floor(i / image.width) * scale,
    r,
    g,
    b,
    /* rgba */
    a,
    /* rgb */
    a: 1,

    /* set width and height to scale, if you scale it */
    width: scale,
    height: scale,
  }));
}
}
getParticles();`
  },
  xyrgb() {
    return `// import { imageData } from './imageData';

function getParticles() {
/* multiply x and y if you want to make big image
with visible pixels */
const scale = 1;

for (let i = 0; i < imageData.length; i++) {
  const [x, y, r, g, b, a] = imageData[i];

  particles.push(new Particle({
    x: x * scale,
    y: y * scale,
    r,
    g,
    b,
    /* xy rgba */
    a,
    /* xy rgb */
    a: 1,

    /* set width and height to scale, if you scale it */
    width: scale,
    height: scale,
  }));
}
}
getParticles();`
  },
  xy() {
    return `// import { imageData } from './imageData';

function getParticles() {
/* multiply x and y if you want to make big image
with visible pixels */
const scale = 1;

for (let i = 0; i < imageData.length; i++) {
  const [x, y] = imageData[i];

  particles.push(new Particle({
    x: x * scale,
    y: y * scale,
    color: 'purple',
    /* set width and height to scale, if you scale it */
    width: scale,
    height: scale,
  }));
}
}
getParticles();`
  },
}

const CopyParticleCode = () => {
  const toast = useToast()
  const state = useSelector((state: RootState) => state.root)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const copyToClipboard = (text: string) => {
    if (!textAreaRef.current) return

    textAreaRef.current.value = text

    textAreaRef.current.select()
    document.execCommand('copy')
  }

  function onClickHandler(type: 'particle' | 'rgb' | 'xyrgb' | 'xy') {
    if (type === 'rgb') {
      copyToClipboard(copyCodeData[type](state.image?.width || 0))
    } else {
      copyToClipboard(copyCodeData[type]())
    }

    toast({
      title: 'Copied',
      position: 'top',
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }

  return (
    <VStack
      alignItems="flex-start"
      pos="absolute"
      top="490px"
      zIndex={4}
      display={['none', 'none', 'none', 'flex']}
    >
      <Box as="label" pos="absolute" left="-10000px" top="-10000px">
        Copy data textarea
        <Textarea ref={textAreaRef} />
      </Box>
      <Button onClick={() => onClickHandler('particle')} colorScheme="blue">
        copy particle
      </Button>
      <Button onClick={() => onClickHandler('rgb')} colorScheme="blue">
        copy rgb / rgba loop
      </Button>
      <Button onClick={() => onClickHandler('xyrgb')} colorScheme="blue">
        copy xy rgb / rgba loop
      </Button>
      <Button onClick={() => onClickHandler('xy')} colorScheme="blue">
        copy xy loop
      </Button>
    </VStack>
  )
}

export default CopyParticleCode
