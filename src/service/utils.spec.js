import {
  truncate,
  currency,
  convertDecimal,
  isValidCreditCardNumber,
  isValidDateExpiry,
  isValidCPF,
} from './utils'

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

  test('Expect card number is valid', () => {
    expect(isValidCreditCardNumber('5338 9860 8756 9325')).toBeTruthy()
  })

  test('Expect card number is invalid', () => {
    expect(isValidCreditCardNumber('1111 1111 1111 1111')).toBeFalsy()
  })

  test('Expect card expirity date is valid', () => {
    expect(isValidDateExpiry('09/22')).toBeTruthy()
  })

  test('Expect card expirity date is invalid', () => {
    expect(isValidDateExpiry('99/99')).toBeFalsy()
  })

  test('Expect CPF is valid', () => {
    expect(isValidCPF('769.905.050-95')).toBeTruthy()
  })

  test('Expect CPF is invalid', () => {
    expect(isValidCPF('769.905.050-91')).toBeFalsy()
  })
})
