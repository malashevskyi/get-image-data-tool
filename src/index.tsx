import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React, { PropsWithChildren, useEffect } from 'react'
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

const RegisterSW: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(
        (registration) => {
          console.log(
            'Service Worker registration successful with scope: ',
            registration.scope
          )
        },
        (err) => {
          console.log('Service Worker registration failed: ', err)
        }
      )
    }
  }, [])

  return <>{children}</>
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RegisterSW>
          <App />
        </RegisterSW>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
