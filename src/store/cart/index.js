/* eslint-disable no-case-declarations */
import { Types } from './actions'

import { calculateAmount, calculateTotal } from '../../service/cart'

const INITIAL_STATE = {
  products: [],
}

const reducer = (state = INITIAL_STATE, action) => {
  let products
  switch (action.type) {
    case Types.ADD_TO_CART:
      products = [...state.products, action.payload]

      return {
        ...state,
        products,
        amount: calculateAmount(products),
        total: calculateTotal(products),
      }

    case Types.UPDATE_AMOUNT_OF_PRODUCT:
      products = state.products.map(product =>
        product.id === action.payload.id
          ? { ...product, amount: action.payload.amount }
          : product
      )

      return {
        ...state,
        products,
        amount: calculateAmount(products),
        total: calculateTotal(products),
      }

    case Types.REMOVE_TO_CART:
      products = state.products.filter(product => product.id !== action.payload)

      return {
        ...state,
        products,
        amount: calculateAmount(products),
        total: calculateTotal(products),
      }

    default:
      return state
  }
}

export default reducer
