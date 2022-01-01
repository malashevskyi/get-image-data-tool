import {
  Badge,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { mainActions, RootState } from '../../store'
import PopoverInfo from './PopoverInfo'

const Types = () => {
  const state = useSelector((state: RootState) => state.root)
  const dispatch = useDispatch()

  const onChangeTabsHandler = (index: number) => {
    dispatch(mainActions.changeCopyDataType(state.controlTypes[index]))
  }

  return (
    <Box as="section" maxW="500px" fontSize="15px" mx="auto" mb={7}>
      <Tabs onChange={onChangeTabsHandler} defaultIndex={2}>
        <TabList alignItems="center">
          <Tab>R G B</Tab>
          <Tab>R G B A</Tab>
          <Tab>X Y R G B</Tab>
          <Tab>X Y R G B A</Tab>
          <Tab>X Y</Tab>
          <PopoverInfo />
        </TabList>
        <TabPanels>
          <TabPanel>
            <Badge>(r, g, b)</Badge>&nbsp;
            <Badge>[[123, 111, 153], [...], ...]</Badge>
          </TabPanel>
          <TabPanel>
            <Badge>(r, g, b, a)</Badge>&nbsp;
            <Badge>[[123, 111, 153, 0.89], [...], ...]</Badge>
          </TabPanel>
          <TabPanel>
            <Badge>(x, y, r, g, b)</Badge>&nbsp;
            <Badge>[[34, 20, 123, 111, 153], [...], ...]</Badge>
          </TabPanel>
          <TabPanel>
            <Badge>(x, y, r, g, b, a)</Badge>&nbsp;
            <Badge>[[34, 20, 123, 111, 153, 0.89], [...], ...]</Badge>
          </TabPanel>
          <TabPanel>
            <Badge>(x, y)</Badge>&nbsp;
            <Badge>[[34, 20], [...], ...]</Badge>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Types
