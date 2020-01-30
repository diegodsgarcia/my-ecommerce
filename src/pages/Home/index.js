import React, { useState, useEffect } from 'react'

import Page from '../../components/Page'

import { getProducts } from '../../service/api'
import { truncate, currency } from '../../service/utils'

import './style.css'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  return (
    <Page>
      <ul className="product-list">
        {products.map(({ id, name, description, price, imageUrl }) => (
          <li className="product-item" key={id}>
            <figure>
              <img src={imageUrl} alt={name} />
            </figure>
            <div className="description">
              <h3 className="product-title">{name}</h3>
              <p>{truncate(description, 20)}</p>
              <div className="product-price">{currency(price)}</div>
            </div>
            <div className="actions">
              <button className="button">Comprar</button>
              <button className="button stroked">Adicionar ao carrinho</button>
            </div>
          </li>
        ))}
      </ul>
    </Page>
  )
}

export default Home
