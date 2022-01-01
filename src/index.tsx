import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

const theme = extendTheme({
  components: {
    Badge: {
      baseStyle: {
        textTransform: 'none',
        fontWeight: '500',
        letterSpacing: 1.2,
      },
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
