import {
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import { mainActions, RootState } from '../../store'

const DataControls = () => {
  const state = useSelector((state: RootState) => state.root)
  const dispatch = useDispatch()
  const [rValue, setRValue] = useState<number[]>([0, 255])
  const [gValue, setGValue] = useState<number[]>([0, 255])
  const [bValue, setBValue] = useState<number[]>([0, 255])
  const [aValue, setAValue] = useState<number[]>([0, 1])
  const debounced = useDebouncedCallback((value) => {
    dispatch(mainActions.setChannel(value))
  }, 100)

  const onChangeRHandler = (value: number[]) => {
    setRValue(value)
    debounced({ key: 'r', value })
  }
  const onChangeGHandler = (value: number[]) => {
    setGValue(value)
    debounced({ key: 'g', value })
  }
  const onChangeBHandler = (value: number[]) => {
    setBValue(value)
    debounced({ key: 'b', value })
  }
  const onChangeAHandler = (value: number[]) => {
    setAValue(value)
    debounced({ key: 'a', value })
  }

  return (
    <Box
      as="section"
      maxW="500px"
      fontSize="15px"
      mx="auto"
      mb={7}
      pointerEvents={state.imageUrl ? 'auto' : 'none'}
      pos="relative"
    >
      {!state.imageUrl && (
        <Box pos="absolute" top="42%" textAlign="center" w="100%">
          load image first to control channels
        </Box>
      )}
      {state.imageUrl &&
        (state.copyDataType === 'rgb' || state.copyDataType === 'rgba') && (
          <Box pos="absolute" top="42%" textAlign="center" w="100%">
            available only with x and y
          </Box>
        )}
      <Box opacity={state.imageUrl ? 1 : 0.4}>
        <RangeSlider
          onChange={onChangeRHandler}
          defaultValue={[0, 255]}
          min={0}
          max={255}
          step={1}
          disabled={
            state.copyDataType === 'rgb' || state.copyDataType === 'rgba'
          }
        >
          <RangeSliderTrack bg="red.100">
            <RangeSliderFilledTrack bg="red.500" />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={10} index={0} bg="red.500" color="white">
            {rValue[0]}
            <Box pos="absolute" left="-100000px">
              R value
            </Box>
          </RangeSliderThumb>
          <RangeSliderThumb boxSize={10} index={1} bg="red.500" color="white">
            {rValue[1]}
            <Box pos="absolute" left="-100000px">
              R value
            </Box>
          </RangeSliderThumb>
        </RangeSlider>
        <RangeSlider
          onChange={onChangeGHandler}
          defaultValue={[0, 255]}
          min={0}
          max={255}
          step={1}
          disabled={
            state.copyDataType === 'rgb' || state.copyDataType === 'rgba'
          }
        >
          <RangeSliderTrack bg="green.100">
            <RangeSliderFilledTrack bg="green.500" />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={10} index={0} bg="green.500" color="white">
            {gValue[0]}
            <Box pos="absolute" left="-100000px">
              G value
            </Box>
          </RangeSliderThumb>
          <RangeSliderThumb boxSize={10} index={1} bg="green.500" color="white">
            {gValue[1]}
            <Box pos="absolute" left="-100000px">
              G value
            </Box>
          </RangeSliderThumb>
        </RangeSlider>
        <RangeSlider
          onChange={onChangeBHandler}
          defaultValue={[0, 255]}
          min={0}
          max={255}
          step={1}
          disabled={
            state.copyDataType === 'rgb' || state.copyDataType === 'rgba'
          }
        >
          <RangeSliderTrack bg="blue.100">
            <RangeSliderFilledTrack bg="blue.500" />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={10} index={0} bg="blue.500" color="white">
            {bValue[0]}
            <Box pos="absolute" left="-100000px">
              B value
            </Box>
          </RangeSliderThumb>
          <RangeSliderThumb boxSize={10} index={1} bg="blue.500" color="white">
            {bValue[1]}
            <Box pos="absolute" left="-100000px">
              B value
            </Box>
          </RangeSliderThumb>
        </RangeSlider>
        <RangeSlider
          onChange={onChangeAHandler}
          defaultValue={[0, 1]}
          min={0}
          max={1}
          step={0.01}
          disabled={
            state.copyDataType === 'rgb' ||
            state.copyDataType === 'rgba' ||
            state.copyDataType === 'xyrgb'
          }
        >
          <RangeSliderTrack bg="gray.100">
            <RangeSliderFilledTrack bg="gray.500" />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={10} index={0} bg="gray.500" color="white">
            {aValue[0]}
            <Box pos="absolute" left="-100000px">
              A value
            </Box>
          </RangeSliderThumb>
          <RangeSliderThumb boxSize={10} index={1} bg="gray.500" color="white">
            {aValue[1]}
            <Box pos="absolute" left="-100000px">
              A value
            </Box>
          </RangeSliderThumb>
        </RangeSlider>
      </Box>
    </Box>
  )
}

export default DataControls
