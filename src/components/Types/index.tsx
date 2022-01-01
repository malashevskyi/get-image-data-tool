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
          <Tab>
            <Box color="red">R</Box>&nbsp;<Box color="green.700">G</Box>&nbsp;
            <Box color="blue.600">B</Box>
          </Tab>
          <Tab>
            <Box color="red">R</Box>&nbsp;<Box color="green.700">G</Box>&nbsp;
            <Box color="blue.600">B</Box>&nbsp;
            <Box color="black">A</Box>
          </Tab>
          <Tab>
            <Box color="black">X</Box>&nbsp;<Box color="black">Y</Box>&nbsp;
            <Box color="red">R</Box>&nbsp;<Box color="green.700">G</Box>&nbsp;
            <Box color="blue.600">B</Box>
          </Tab>
          <Tab>
            <Box color="black">X</Box>&nbsp;<Box color="black">Y</Box>&nbsp;
            <Box color="red">R</Box>&nbsp;<Box color="green.700">G</Box>&nbsp;
            <Box color="blue.600">B</Box>&nbsp;
            <Box color="black">A</Box>
          </Tab>
          <Tab>X Y</Tab>
          <PopoverInfo />
        </TabList>
        <TabPanels>
          <TabPanel>
            <Badge>
              (
              <Box as="span" color="red">
                r
              </Box>
              ,&nbsp;
              <Box as="span" color="green.700">
                g
              </Box>
              ,&nbsp;
              <Box as="span" color="blue.600">
                b
              </Box>
              )
            </Badge>
            &nbsp;
            <Badge>
              [[
              <Box as="span" color="red">
                123
              </Box>
              ,&nbsp;
              <Box as="span" color="green.700">
                111
              </Box>
              ,&nbsp;
              <Box as="span" color="blue.600">
                153
              </Box>
              ], [...], ...]
            </Badge>
          </TabPanel>
          <TabPanel>
            <Badge>
              (
              <Box as="span" color="red">
                r
              </Box>
              ,&nbsp;
              <Box as="span" color="green.700">
                g
              </Box>
              ,&nbsp;
              <Box as="span" color="blue.600">
                b
              </Box>
              ,&nbsp;
              <Box as="span" color="black">
                a
              </Box>
              )
            </Badge>
            &nbsp;
            <Badge>
              [[
              <Box as="span" color="red">
                123
              </Box>
              ,&nbsp;
              <Box as="span" color="green.700">
                111
              </Box>
              ,&nbsp;
              <Box as="span" color="blue.600">
                153
              </Box>
              ,&nbsp;
              <Box as="span" color="black">
                0.89
              </Box>
              ], [...], ...]
            </Badge>
          </TabPanel>
          <TabPanel>
            <Badge>
              (
              <Box as="span" color="black">
                x
              </Box>
              ,&nbsp;
              <Box as="span" color="black">
                y
              </Box>
              ,&nbsp;
              <Box as="span" color="red">
                r
              </Box>
              ,&nbsp;
              <Box as="span" color="green.700">
                g
              </Box>
              ,&nbsp;
              <Box as="span" color="blue.600">
                b
              </Box>
              )
            </Badge>
            &nbsp;
            <Badge>
              [[
              <Box as="span" color="black">
                34
              </Box>
              ,&nbsp;
              <Box as="span" color="black">
                20
              </Box>
              ,&nbsp;
              <Box as="span" color="red">
                123
              </Box>
              ,&nbsp;
              <Box as="span" color="green.700">
                111
              </Box>
              ,&nbsp;
              <Box as="span" color="blue.600">
                153
              </Box>
              ], [...], ...]
            </Badge>
          </TabPanel>
          <TabPanel>
            <Badge>
              (
              <Box as="span" color="black">
                x
              </Box>
              ,&nbsp;
              <Box as="span" color="black">
                y
              </Box>
              ,&nbsp;
              <Box as="span" color="red">
                r
              </Box>
              ,&nbsp;
              <Box as="span" color="green.700">
                g
              </Box>
              ,&nbsp;
              <Box as="span" color="blue.600">
                b
              </Box>
              ,&nbsp;
              <Box as="span" color="black">
                a
              </Box>
              )
            </Badge>
            &nbsp;
            <Badge>
              [[
              <Box as="span" color="black">
                34
              </Box>
              ,&nbsp;
              <Box as="span" color="black">
                20
              </Box>
              ,&nbsp;
              <Box as="span" color="red">
                123
              </Box>
              ,&nbsp;
              <Box as="span" color="green.700">
                111
              </Box>
              ,&nbsp;
              <Box as="span" color="blue.600">
                153
              </Box>
              ,&nbsp;
              <Box as="span" color="black">
                0.89
              </Box>
              ], [...], ...]
            </Badge>
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
