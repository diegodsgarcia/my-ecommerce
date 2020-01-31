import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CloseCircle } from 'styled-icons/remix-fill/CloseCircle'

import Page from '../../components/Page'

import { updateCartAmount, removeInCart } from '../../service/cart'
import { currency } from '../../service/utils'

import './style.css'

function Cart() {
  const { products, total } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  return (
    <Page>
      <div className="cart">
        <h1 className="cart-title">Meu Carrinho</h1>
        {products.length ? (
          <ul className="cart-list">
            {products.map(item => (
              <li key={item.id} className="cart-item">
                <figure>
                  <img src={item.imageUrl} alt={item.name} />
                </figure>
                <div className="cart-item-title">{item.name}</div>
                <div className="cart-item-amount">
                  <input
                    onChange={element => {
                      dispatch(updateCartAmount(item, element.target.value))
                    }}
                    type="number"
                    min="1"
                    placeholder={item.amount}
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
            <Link className="button">Finalizar compras</Link>
          ) : (
            ''
          )}
        </div>
      </div>
    </Page>
  )
}

export default Cart
