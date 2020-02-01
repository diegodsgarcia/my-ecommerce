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

  const [user, setUser] = useState({
    name: '',
    email: '',
    birthday: '',
    phone: '',
    cpf: '',
  })

  const [address, setAddress] = useState({
    zipcode: '',
    street: '',
    streetNumber: '',
    neighborhood: '',
    city: '',
    state: '',
  })

  const [cardInfo, setCardInfo] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    focused: '',
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
    const zipcode = event.target.value
    const pattern = /[0-9]{5}-[0-9]{3}/
    setAddress({ ...address, zipcode })

    if (pattern.test(zipcode)) {
      const {
        cep,
        logradouro,
        bairro,
        localidade,
        uf,
        erro,
      } = await getAddress(zipcode)

      if (!erro) {
        setAddress({
          ...address,
          zipcode: cep,
          street: logradouro,
          neighborhood: bairro,
          city: localidade,
          state: uf,
        })
      }
    }
  }

  async function onFinishCheckout(event) {
    event.preventDefault()
    const result = await createTransaction({
      user,
      cardInfo,
      products,
      address,
      total,
    })
    console.log(result)
  }

  return (
    <Page>
      <div className="checkout">
        <h1 className="checkout-title">Finalizar pedido</h1>

        <form className="checkout-form" onSubmit={onFinishCheckout}>
          <h3>Informações pessoais</h3>
          <div className="checkout-form-group">
            <div>
              <Input
                type="text"
                placeholder="Nome"
                value={user.name}
                onChange={event =>
                  setUser({ ...user, name: event.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={event =>
                  setUser({ ...user, email: event.target.value })
                }
              />
              <Input
                mask="99/99/9999"
                type="text"
                placeholder="Data de nascimento"
                value={user.birthday}
                onChange={event =>
                  setUser({ ...user, birthday: event.target.value })
                }
              />
              <Input
                mask="(99)99999-9999"
                type="text"
                placeholder="Telefone"
                value={user.phone}
                onChange={event =>
                  setUser({ ...user, phone: event.target.value })
                }
              />
              <Input
                mask="999.999.999-99"
                type="text"
                placeholder="CPF"
                value={user.cpf}
                onChange={event =>
                  setUser({ ...user, cpf: event.target.value })
                }
              />
            </div>
            <div>
              <Input
                mask="99999-999"
                type="text"
                placeholder="CEP"
                value={address.zipcode}
                onChange={onCheckAddress}
              />
              <Input
                type="text"
                placeholder="Endereço"
                value={address.street}
                onChange={event =>
                  setAddress({ ...address, street: event.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Bairro"
                value={address.neighborhood}
                onChange={event =>
                  setAddress({ ...address, neighborhood: event.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Cidade"
                value={address.city}
                onChange={event =>
                  setAddress({ ...address, city: event.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Estado"
                value={address.state}
                onChange={event =>
                  setAddress({ ...address, state: event.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Número"
                value={address.streetNumber}
                onChange={event =>
                  setAddress({ ...address, streetNumber: event.target.value })
                }
              />
            </div>
          </div>
          <h3>Dados de pagamento</h3>
          <div className="checkout-form-group">
            <div>
              <Input
                type="text"
                placeholder="Nome do cartão"
                name="name"
                value={cardInfo.name}
                onFocus={event => {
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
                value={cardInfo.number}
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
                value={cardInfo.expiry}
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
                value={cardInfo.cvc}
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
