import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Cards from 'react-credit-cards'

import { createTransaction } from '../../service/api'
import { currency } from '../../service/utils'

import Page from '../../components/Page'
import Input from '../../components/Input'

import 'react-credit-cards/es/styles-compiled.css'
import './style.css'

function Checkout() {
  const products = useSelector(state => state.cart.products)
  const total = useSelector(state => state.cart.total)

  const [cardInfo, setCardInfo] = useState({
    name: '',
    cvc: '',
    expiry: '',
    number: '',
  })

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

  async function finishCheckout(event) {
    event.preventDefault()
    const result = await createTransaction()
    console.log(result)
  }

  return (
    <Page>
      <div className="checkout">
        <h1 className="checkout-title">Finalizar pedido</h1>

        <form className="checkout-form" onSubmit={finishCheckout}>
          <h3>Informações pessoais</h3>
          <div className="checkout-form-group">
            <Input type="text" name="CEP" />
            <Input type="text" name="Endereço" />
            <Input type="text" name="Cidade" />
            <Input type="text" name="Estado" />
          </div>
          <h3>Dados de pagamento</h3>
          <div className="checkout-form-group">
            <Input
              type="text"
              name="Nome do cartão"
              onChange={event =>
                setCardInfo({ ...cardInfo, name: event.target.value })
              }
            />
            <Input
              type="text"
              name="Numero do cartão"
              onChange={event =>
                setCardInfo({ ...cardInfo, number: event.target.value })
              }
            />
            <Input
              type="text"
              name="Data de validade do cartão "
              onChange={event =>
                setCardInfo({ ...cardInfo, expiry: event.target.value })
              }
            />
            <Input
              type="text"
              name="Codigo verificador do cartão"
              onChange={event =>
                setCardInfo({ ...cardInfo, cvc: event.target.value })
              }
            />
          </div>
          <Cards {...cardInfo} />
          <button className="button">Finalizar compra</button>
        </form>

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
