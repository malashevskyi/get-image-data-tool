import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import GlobalContextProvider from './context/globalContext'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
