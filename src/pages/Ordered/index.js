import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Page from '../../components/Page'

import { getTransaction, getPayables } from '../../service/api'
import { currency, convertDecimal } from '../../service/utils'

import './style.css'

function Ordered() {
  const { id } = useParams()
  const [transaction, setTransaction] = useState(null)
  const [[client, platform], setPayables] = useState([])

  useEffect(() => {
    getTransaction(id).then(setTransaction)
    getPayables(id).then(res => setPayables(res))
  }, [id])

  if (!transaction) {
    return (
      <Page>
        <p>Você precisa possuír um ID de trançação para ver sua compra</p>
      </Page>
    )
  }

  return (
    <Page>
      <div className="ordered">
        <h1 className="ordered-title">Sua compra foi realizada!</h1>
        <h2 className="ordered-subtitle">Produtos</h2>
        <ul className="ordered-list">
          {transaction.items.map(item => (
            <li key={item.id} className="ordered-item">
              <div>{item.title}</div>
              <div>{currency(convertDecimal(item.unit_price))}</div>
              <div className="ordered-amount">{item.quantity}x</div>
            </li>
          ))}
        </ul>
        <p className="ordered-total">
          {currency(convertDecimal(transaction.amount))}
        </p>
        <div className="ordered-receptors">
          <div>
            <h2 className="ordered-subtitle">Cliente</h2>
            {client && <p>{currency(convertDecimal(client.amount))}</p>}
          </div>
          <div>
            <h2 className="ordered-subtitle">Plataforma</h2>
            {platform && <p>{currency(convertDecimal(platform.amount))}</p>}
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Ordered
