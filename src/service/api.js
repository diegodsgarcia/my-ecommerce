import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
})

async function getProducts() {
  const { data } = await api.get('/products')
  return data.products
}

export { getProducts }
