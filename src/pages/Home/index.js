import React, { useState, useEffect } from 'react'

import Page from '../../components/Page'

import { getProducts } from '../../service/api'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  return (
    <Page>
      <ul>
        {products.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </Page>
  )
}

export default Home
