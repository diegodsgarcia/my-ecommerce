import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Page from '../../components/Page'

import { getProducts } from '../../service/api'
import { addInCart } from '../../service/cart'
import { truncate, currency } from '../../service/utils'

import './style.css'

function Home() {
  const [products, setProducts] = useState([])
  const { cart } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  return (
    <Page>
      <ul className="product-list">
        {products.map(product => (
          <li className="product-item" key={product.id}>
            <figure>
              <img src={product.imageUrl} alt={product.name} />
            </figure>
            <div className="description">
              <h3 className="product-title">{product.name}</h3>
              <p>{truncate(product.description, 20)}</p>
              <div className="product-price">{currency(product.price)}</div>
            </div>
            <div className="actions">
              <Link
                className="button"
                to="/carrinho"
                onClick={() => dispatch(addInCart(cart, product))}
              >
                Comprar
              </Link>
              <button
                className="button stroked"
                onClick={() => dispatch(addInCart(cart, product))}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Page>
  )
}

export default Home
