import { truncate, currency, convertDecimal } from './utils'

describe('Utils tests:', () => {
  test('Expect text is truncate', () => {
    const text = 'Hello this is just a test!!!'
    expect(truncate(text, 3)).toEqual('Hello this is...')
  })

  test('Expect value to be converted in REAL currency', () => {
    const value = 110.25
    expect(currency(value)).toMatch('R$')
  })

  test('Expect value to be converted in DECIMAL', () => {
    const value = 11025
    expect(convertDecimal(value)).toBe(110.25)
  })
})
