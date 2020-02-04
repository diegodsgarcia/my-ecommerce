import React, { useState } from 'react'
import Cards from 'react-credit-cards'

import { getAddress } from '../../service/api'

import Input from '../Input'

import './style.css'

function FormCheckout({ onSubmit }) {
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

  function onFinishCheckout(event) {
    event.preventDefault()
    onSubmit({
      user,
      cardInfo,
      address,
    })
  }

  return (
    <form className="form-checkout" onSubmit={onFinishCheckout}>
      <h3>Informações pessoais</h3>
      <div className="form-checkout-group">
        <div>
          <Input
            type="text"
            placeholder="Nome"
            value={user.name}
            required
            onChange={event => setUser({ ...user, name: event.target.value })}
          />
          <Input
            type="email"
            placeholder="Email"
            value={user.email}
            required
            onChange={event => setUser({ ...user, email: event.target.value })}
          />
          <Input
            mask="99/99/9999"
            type="text"
            placeholder="Data de nascimento"
            value={user.birthday}
            required
            onChange={event =>
              setUser({ ...user, birthday: event.target.value })
            }
          />
          <Input
            mask="(99)99999-9999"
            type="text"
            placeholder="Telefone"
            value={user.phone}
            required
            onChange={event => setUser({ ...user, phone: event.target.value })}
          />
          <Input
            mask="999.999.999-99"
            type="text"
            placeholder="CPF"
            value={user.cpf}
            required
            onChange={event => setUser({ ...user, cpf: event.target.value })}
          />
        </div>
        <div>
          <Input
            mask="99999-999"
            type="text"
            placeholder="CEP"
            required
            value={address.zipcode}
            onChange={onCheckAddress}
          />
          <Input
            type="text"
            placeholder="Endereço"
            value={address.street}
            required
            onChange={event =>
              setAddress({ ...address, street: event.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Bairro"
            value={address.neighborhood}
            required
            onChange={event =>
              setAddress({ ...address, neighborhood: event.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Cidade"
            value={address.city}
            required
            onChange={event =>
              setAddress({ ...address, city: event.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Estado"
            value={address.state}
            required
            onChange={event =>
              setAddress({ ...address, state: event.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Número"
            value={address.streetNumber}
            required
            onChange={event =>
              setAddress({ ...address, streetNumber: event.target.value })
            }
          />
        </div>
      </div>
      <h3>Dados de pagamento</h3>
      <div className="form-checkout-group">
        <div>
          <Input
            type="text"
            placeholder="Nome do cartão"
            name="name"
            value={cardInfo.name}
            required
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
            required
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
            required
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
            required
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
  )
}

export default FormCheckout
