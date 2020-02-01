import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Cards from 'react-credit-cards'

import { createTransaction, getAddress } from '../../service/api'
import { currency } from '../../service/utils'

import { Page, Input } from '../../components'

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
    focused: '',
  })

  const [address, setAddress] = useState({
    cep: '',
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
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

  async function onCheckAddress(event) {
    const cep = event.target.value
    const pattern = /[0-9]{5}-[0-9]{3}/
    setAddress({ ...address, cep })

    if (pattern.test(cep)) {
      const result = await getAddress(cep)

      if (!result.erro) {
        setAddress(result)
      }
    }
  }

  async function onFinishCheckout(event) {
    event.preventDefault()
    const result = await createTransaction()
    console.log(result)
  }

  return (
    <Page>
      <div className="checkout">
        <h1 className="checkout-title">Finalizar pedido</h1>

        <form className="checkout-form" onSubmit={onFinishCheckout}>
          <h3>Informações pessoais</h3>
          <div className="checkout-form-group">
            <Input
              mask="99999-999"
              type="text"
              placeholder="CEP"
              onChange={onCheckAddress}
              value={address.cep}
            />
            <Input
              type="text"
              placeholder="Endereço"
              value={address.logradouro}
            />
            <Input
              type="text"
              placeholder="Cidade"
              value={address.localidade}
            />
            <Input type="text" placeholder="Estado" value={address.uf} />
            <Input type="text" placeholder="Número" />
            <Input type="text" placeholder="Complemento" />
          </div>
          <h3>Dados de pagamento</h3>
          <div className="checkout-form-payment">
            <div>
              <Input
                type="text"
                placeholder="Nome do cartão"
                name="name"
                onFocus={event => {
                  console.log(1)
                  setCardInfo({ ...cardInfo, focused: event.target.name })
                }}
                onChange={event =>
                  setCardInfo({ ...cardInfo, name: event.target.value })
                }
              />
              <Input
                mask="9999 9999 9999 9999"
                type="text"
                name="number"
                placeholder="Numero do cartão"
                onFocus={event =>
                  setCardInfo({ ...cardInfo, focused: event.target.name })
                }
                onChange={event =>
                  setCardInfo({ ...cardInfo, number: event.target.value })
                }
              />
              <Input
                mask="99/99"
                type="text"
                name="expiry"
                placeholder="Data de validade do cartão"
                onFocus={event =>
                  setCardInfo({ ...cardInfo, focused: event.target.name })
                }
                onChange={event =>
                  setCardInfo({ ...cardInfo, expiry: event.target.value })
                }
              />
              <Input
                mask="999"
                type="text"
                name="cvc"
                placeholder="Codigo verificador do cartão"
                onFocus={event =>
                  setCardInfo({ ...cardInfo, focused: event.target.name })
                }
                onChange={event =>
                  setCardInfo({ ...cardInfo, cvc: event.target.value })
                }
              />
            </div>
            <Cards {...cardInfo} />
          </div>

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
