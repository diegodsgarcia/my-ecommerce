import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CloseCircle } from 'styled-icons/remix-fill/CloseCircle'

import Page from '../../components/Page'

import { updateCartAmount, removeInCart } from '../../service/cart'
import { currency } from '../../service/utils'

import './style.css'

function Cart() {
  const { products = [], total = 0 } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  return (
    <Page>
      <div className="cart">
        <h1 className="cart-title">Meu Carrinho</h1>
        {products.length ? (
          <ul className="cart-list">
            {products.map(item => (
              <li key={item.id} className="cart-item">
                <figure className="cart-item-figure">
                  <img src={item.imageUrl} alt={item.name} />
                </figure>
                <div className="cart-item-title">{item.name}</div>
                <div className="cart-item-amount">
                  <input
                    type="number"
                    min={1}
                    placeholder={item.amount}
                    onChange={event => {
                      const value = +event.target.value
                      if (value > 0) {
                        dispatch(updateCartAmount(item, value))
                      }
                    }}
                  />
                </div>
                <div className="cart-item-price">{currency(item.price)}</div>
                <div className="cart-item-price-total">
                  {currency(item.price * item.amount)}
                </div>
                <CloseCircle
                  className="cart-item-remove"
                  onClick={() => dispatch(removeInCart(item))}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>Não há nenhum produto em sem carrinho</p>
        )}
        <div className="cart-footer">
          <div className="cart-total">
            <div className="cart-total-title">Total:</div>
            <div className="cart-total-price">{currency(total)}</div>
          </div>
          {products.length ? (
            <Link className="button" to="/finalizar-pedido">
              Finalizar pedido
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
    </Page>
  )
}

export default Cart
