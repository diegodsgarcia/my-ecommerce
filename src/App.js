import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home, Cart, Description } from './pages'

import { Navigation } from './components'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/descricao">
          <Description />
        </Route>
        <Route path="/carrinho">
          <Cart />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Navigation />
    </Router>
  )
}

export default App
