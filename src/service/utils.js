function truncate(text, amoutWords) {
  const treatedText = text
    .match(/.+?\s/g)
    .filter((regexEl, i) => i < amoutWords)
    .join('')

  return `${treatedText.substring(0, treatedText.length - 1)}...`
}

function currency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function convertDecimal(value) {
  value = value.toString()
  const lastPosition = value.length
  const beforeDotPosition = value.length - 2
  return +`${value.slice(0, beforeDotPosition)}.${value.slice(
    beforeDotPosition,
    lastPosition
  )}`
}

function isValidDateExpiry(date) {
  return /(0[1-9]|10|11|12)\/[2-9][0-9]$/.test(date)
}

/* Função de terceiro */
function isValidCreditCardNumber(number) {
  const cardNumber = number.replace(/\s/g, '')
  let cardType = null

  if (VisaCardnumber(cardNumber)) {
    cardType = 'visa'
  } else if (MasterCardnumber(cardNumber)) {
    cardType = 'mastercard'
  } else if (AmexCardnumber(cardNumber)) {
    cardType = 'americanexpress'
  } else if (DiscoverCardnumber(cardNumber)) {
    cardType = 'discover'
  } else if (DinerClubCardnumber(cardNumber)) {
    cardType = 'dinerclub'
  } else if (JCBCardnumber(cardNumber)) {
    cardType = 'jcb'
  }

  return cardType

  function AmexCardnumber(inputtxt) {
    const cardno = /^(?:3[47][0-9]{13})$/
    return cardno.test(inputtxt)
  }

  function VisaCardnumber(inputtxt) {
    const cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
    return cardno.test(inputtxt)
  }

  function MasterCardnumber(inputtxt) {
    const cardno = /^(?:5[1-5][0-9]{14})$/
    return cardno.test(inputtxt)
  }

  function DiscoverCardnumber(inputtxt) {
    const cardno = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/
    return cardno.test(inputtxt)
  }

  function DinerClubCardnumber(inputtxt) {
    const cardno = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/
    return cardno.test(inputtxt)
  }

  function JCBCardnumber(inputtxt) {
    const cardno = /^(?:(?:2131|1800|35\d{3})\d{11})$/
    return cardno.test(inputtxt)
  }
}

/* Função de terceiro */
function isValidCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '')
  if (cpf === '') return false
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  )
    return false
  // Valida 1o digito
  let add = 0
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)
  let rev = 11 - (add % 11)
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(cpf.charAt(9))) return false
  // Valida 2o digito
  add = 0
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
  rev = 11 - (add % 11)
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(cpf.charAt(10))) return false
  return true
}

export {
  truncate,
  currency,
  convertDecimal,
  isValidCreditCardNumber,
  isValidCPF,
  isValidDateExpiry,
}
