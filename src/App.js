import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Home, Cart, Description } from './pages'

import { Navigation } from './components'

import './styles/global.css'

function App() {
  return (
    <Router>
      <main>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/descricao">
            <Description />
          </Route>
          <Route path="/carrinho">
            <Cart />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

export default App
