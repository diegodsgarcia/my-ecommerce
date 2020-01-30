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

export { truncate, currency }
