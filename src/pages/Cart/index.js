import React from 'react'

import Page from '../../components/Page'

import { currency } from '../../service/utils'

import './style.css'

function Cart() {
  const items = new Array(100).fill('test')
  return (
    <Page>
      <div className="cart">
        <h1 className="cart-title">Meu Carrinho</h1>
        <ul className="cart-list">
          {items.map((item, i) => (
            <li key={i} className="cart-item">
              <figure>
                <img
                  src="https://images-na.ssl-images-amazon.com/images/I/81lwcYUU9TL._AC_SY445_.jpg"
                  alt=""
                />
              </figure>
              <div className="cart-item-title">Titulo</div>
              <div className="cart-item-amount">
                <input type="number" placeholder="1" />
              </div>
              <div className="cart-item-price">{currency(100)}</div>
              <div className="cart-item-price-total">{currency(200)}</div>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <div className="cart-total-title">Total:</div>
          <div className="cart-total-price">{currency(2000)}</div>
        </div>
      </div>
    </Page>
  )
}

export default Cart
