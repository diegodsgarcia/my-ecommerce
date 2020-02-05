import {
  addInCart,
  removeInCart,
  updateCartAmount,
  calculateAmount,
  calculateTotal,
} from './cart'
import { Types } from '../store/cart/actions'

describe('Cart tests:', () => {
  test('Should add a new product in Cart', () => {
    const cartList = {
      products: [],
      amount: 1,
      total: 1000,
    }

    const product = {
      id: 1,
      name: 'Super Mario Odissey',
      imageUrl: 'Only a test',
      description: 'Only a test',
    }

    expect(addInCart(cartList, product)).toEqual({
      error: undefined,
      meta: undefined,
      payload: { ...product, amount: 1 },
      type: Types.ADD_TO_CART,
    })
  })

  test('Should add a same product in Cart', () => {
    const product = {
      id: 1,
      name: 'Super Mario Odissey',
      imageUrl: 'Only a test',
      description: 'Only a test',
    }

    const cartList = {
      products: [
        {
          id: 1,
          name: 'Super Mario Odissey',
          imageUrl: 'Only a test',
          description: 'Only a test',
          amount: 1,
          price: 1000,
        },
      ],
      amount: 1,
      total: 1000,
    }

    expect(addInCart(cartList, product)).toEqual({
      error: undefined,
      meta: undefined,
      payload: { id: 1, amount: 2 },
      type: Types.UPDATE_AMOUNT_OF_PRODUCT,
    })
  })

  test('Should remove a product in Cart', () => {
    const product = {
      id: 1,
      name: 'Super Mario Odissey',
      imageUrl: 'Only a test',
      description: 'Only a test',
    }

    expect(removeInCart(product)).toEqual({
      error: undefined,
      meta: undefined,
      payload: 1,
      type: Types.REMOVE_TO_CART,
    })
  })

  test('Should update amount in Cart', () => {
    const product = {
      id: 1,
      name: 'Super Mario Odissey',
      imageUrl: 'Only a test',
      description: 'Only a test',
    }

    expect(updateCartAmount(product, 2)).toEqual({
      error: undefined,
      meta: undefined,
      payload: { id: 1, amount: 2 },
      type: Types.UPDATE_AMOUNT_OF_PRODUCT,
    })
  })

  test('Should calculate amount in Cart', () => {
    const products = [
      {
        id: 1,
        name: 'Item 1',
        imageUrl: 'Only a test',
        description: 'Only a test',
        price: 1000,
        amount: 2,
      },
      {
        id: 2,
        name: 'Item 1',
        imageUrl: 'Only a test',
        description: 'Only a test',
        price: 1000,
        amount: 1,
      },
    ]

    expect(calculateAmount(products)).toBe(3)
  })

  test('Should calculate total in Cart', () => {
    const products = [
      {
        id: 1,
        name: 'Item 1',
        imageUrl: 'Only a test',
        description: 'Only a test',
        price: 1000,
        amount: 1,
      },
      {
        id: 2,
        name: 'Item 1',
        imageUrl: 'Only a test',
        description: 'Only a test',
        price: 1000,
        amount: 1,
      },
    ]

    expect(calculateTotal(products)).toEqual(2000)
  })
})
