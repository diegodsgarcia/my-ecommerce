import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { Home } from 'styled-icons/boxicons-solid/Home'
import { Cart } from 'styled-icons/boxicons-solid/Cart'

import './style.css'

function Navigation() {
  const cartAmount = useSelector(state => state.cart.amount)
  return (
    <div className="navigation-container">
      <nav className="navigation">
        <div className="logo">
          <Link to="/">
            <h2>My E-commerce</h2>
          </Link>
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
              <span className="navigation-cart-amount">{cartAmount}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
