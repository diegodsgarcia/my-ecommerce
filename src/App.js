import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

import { Home, Cart, Checkout, Ordered } from './pages'
import { Navigation } from './components'

import './styles/global.css'

function App() {
  return (
    <Router>
      <Provider store={store}>
        <main>
          <Navigation />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/finalizar-pedido">
              <Checkout />
            </Route>
            <Route path="/carrinho">
              <Cart />
            </Route>
            <Route path="/pedido/:id">
              <Ordered />
            </Route>
          </Switch>
        </main>
      </Provider>
    </Router>
  )
}

export default App
