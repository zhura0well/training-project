
import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import Router from './router'
import store from './redux/store'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Router />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
