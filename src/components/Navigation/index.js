import React from 'react'
import { NavLink } from 'react-router-dom'

import { Home } from 'styled-icons/boxicons-solid/Home'
import { Cart } from 'styled-icons/boxicons-solid/Cart'

import './style.css'

function Navigation() {
  return (
    <div className="container">
      <nav className="navigation">
        <div className="logo">
          <h2>My E-commerce</h2>
        </div>
        <ul>
          <li>
            <NavLink exact to="/">
              <Home />
            </NavLink>
          </li>
          <li>
            <NavLink to="/carrinho">
              <Cart />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
