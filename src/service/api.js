/* eslint-disable no-useless-escape */
import axios from 'axios'
import pagarme from 'pagarme'

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
})

async function getProducts() {
  const { data } = await api.get('/products')
  return data.products
}

async function getAddress(cep) {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_CEP}/${cep}/json`
  )
  return data
}

async function createTransaction({ user, cardInfo, products, address, total }) {
  const client = await pagarme.client.connect({
    api_key: process.env.REACT_APP_PAGARME_KEY,
  })

  const items = convertProductsToItemsPagarme(products)

  const transaction = await client.transactions.create({
    amount: convertPriceToPagarme(total),
    card_number: cardInfo.number,
    card_cvv: cardInfo.cvc,
    card_expiration_date: convertExpirationDateToPagarme(cardInfo.expiry),
    card_holder_name: cardInfo.name,
    split_rules: [
      {
        percentage: 85,
        recipient_id: process.env.REACT_APP_CLIENT_RECEPTOR_ID,
      },
      {
        percentage: 15,
        recipient_id: process.env.REACT_APP_PLATFORM_RECEPTOR_ID,
      },
    ],
    customer: {
      external_id: '#123',
      name: user.name,
      type: 'individual',
      country: 'br',
      email: user.email,
      documents: [
        {
          type: 'cpf',
          number: convertCpfToPagarme(user.cpf),
        },
      ],
      phone_numbers: [convertPhoneToPagarme(user.phone)],
      birthday: convertDateToPagarme(user.birthday),
    },
    billing: {
      name: 'My E-commerce',
      address: {
        country: 'br',
        state: 'sp',
        city: 'São Paulo',
        neighborhood: 'Paraiso',
        street: 'Av. Paulista',
        street_number: '447',
        zipcode: '01310000',
      },
    },
    shipping: {
      name: user.name,
      fee: 1000,
      delivery_date: getDateNowMoreTwoDays(),
      expedited: true,
      address: {
        country: 'br',
        state: address.state.toLowerCase(),
        city: address.city,
        neighborhood: address.neighborhood,
        street: address.street,
        street_number: address.streetNumber,
        zipcode: convertZipcodeToPagarme(address.zipcode),
      },
    },
    items,
  })
  return transaction

  function convertPriceToPagarme(price) {
    return Number(price.toString().replace(/\./g, ''))
  }

  function convertZipcodeToPagarme(zipcode) {
    return zipcode.replace(/\-/g, '')
  }

  function convertExpirationDateToPagarme(expiry) {
    return expiry.replace('/', '')
  }

  function convertDateToPagarme(date) {
    const [day, month, year] = date.split('/')
    return `${year}-${month}-${day}`
  }

  function convertPhoneToPagarme(phone) {
    return `+55${phone.replace(/[\(\)\-]/g, '')}`
  }

  function convertCpfToPagarme(cpf) {
    return cpf.replace(/[\.\-]/g, '')
  }

  function convertProductsToItemsPagarme(products) {
    return products.map(({ id, name, price, amount }) => ({
      id,
      title: name,
      unit_price: convertPriceToPagarme(price),
      quantity: amount,
      tangible: true,
    }))
  }

  function getDateNowMoreTwoDays() {
    const oneDay = 60 * 60 * 24 * 1000
    const date = new Date(new Date().getTime() + oneDay * 2)

    let month = `${date.getMonth() + 1}`
    let day = `${date.getDate()}`
    let year = `${date.getFullYear()}`

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }
}

export { getProducts, getAddress, createTransaction }
