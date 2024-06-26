import React from 'react'
import { Provider } from 'react-redux'

import { store } from './store.js'

function Providers({children}) {
  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default Providers