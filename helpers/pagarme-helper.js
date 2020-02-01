const pagarme = require('pagarme')
const dotenv = require('dotenv')
dotenv.config()

const { REACT_APP_PAGARME_KEY } = process.env

async function getAllTransactions() {
  const client = await pagarme.client.connect({
    api_key: REACT_APP_PAGARME_KEY,
  })

  try {
    const transactions = await client.transactions.all()
    console.log(transactions)
  } catch (error) {
    console.log(error.response.errors)
  }
}

async function createReceptors() {
  const { recipients } = await pagarme.client.connect({
    api_key: REACT_APP_PAGARME_KEY,
  })

  try {
    const myClient = await recipients.create({
      bank_account: {
        bank_code: '123',
        agencia: '1234',
        conta: '1234567',
        type: 'conta_corrente',
        conta_dv: '1',
        document_number: '61890171000',
        legal_name: 'My Client',
      },
      transfer_interval: 'weekly',
      transfer_day: 5,
      transfer_enabled: true,
    })

    const myPlatform = await recipients.create({
      bank_account: {
        bank_code: '123',
        agencia: '1234',
        conta: '1234567',
        type: 'conta_corrente',
        conta_dv: '1',
        document_number: '26268738888',
        legal_name: 'My Platform',
      },
      transfer_interval: 'weekly',
      transfer_day: 5,
      transfer_enabled: true,
    })
    console.log(myClient)
    console.log(myPlatform)
  } catch (error) {
    console.log(error.response.errors)
  }
}

async function getAllReceptors() {
  const client = await pagarme.client.connect({
    api_key: REACT_APP_PAGARME_KEY,
  })

  try {
    const recipients = await client.recipients.all()
    console.log(recipients)
  } catch (error) {
    console.log(error.response.errors)
  }
}

module.exports = { getAllTransactions, createReceptors, getAllReceptors }
