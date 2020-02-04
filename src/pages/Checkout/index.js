import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { clearCart } from '../../store/cart/actions'

import { createTransaction } from '../../service/api'
import { currency } from '../../service/utils'

import { Page, FormCheckout, Alert } from '../../components'

import 'react-credit-cards/es/styles-compiled.css'
import './style.css'

function Checkout() {
  const products = useSelector(state => state.cart.products)
  const total = useSelector(state => state.cart.total)
  const history = useHistory()
  const dispatch = useDispatch()

  const [error, setError] = useState(null)

  async function onFinishCheckout({ user, cardInfo, address }) {
    try {
      const { tid } = await createTransaction({
        user,
        cardInfo,
        products,
        address,
        total,
      })

      dispatch(clearCart())
      history.push(`/pedido/${tid}`)
    } catch (error) {
      setError(error)
    }
  }

  if (!products.length) {
    return (
      <Page>
        <h1>Finalizar pedido</h1>
        <p>
          Você deve adicionar algum item seu carrinho, para finalizar o pedido!
        </p>
      </Page>
    )
  }

  return (
    <Page>
      <div className="checkout">
        <h1 className="checkout-title">Finalizar pedido</h1>
        {error && (
          <Alert className="checkout-error" onClick={() => setError(false)}>
            Algum campo está inválido para continuar o pedido.
          </Alert>
        )}

        <FormCheckout onSubmit={onFinishCheckout} />

        <div className="checkout-info">
          <ul className="checkout-list">
            {products.map(item => (
              <li className="checkout-item" key={item.id}>
                <figure className="checkout-item-figure">
                  <img src={item.imageUrl} alt={item.name} />
                </figure>
                <div className="checkout-item-name">{item.name}</div>
                <div className="checkout-item-amount">{item.amount}</div>
                <div className="checkout-item-price">
                  {currency(item.price * item.amount)}
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-resume">
            <div className="checkout-resume-total">{currency(total)}</div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Checkout
