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

export { truncate, currency, convertDecimal }
