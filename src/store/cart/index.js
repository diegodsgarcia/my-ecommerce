/* eslint-disable no-case-declarations */
import { Types } from './actions'

import { calculateAmount, calculateTotal } from '../../service/cart'

const INITIAL_STATE = {
  products: [
    {
      id: '1',
      name: 'Nintendo Switch',
      price: 2030.11,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSyV_3_Gd9lcoHrj3vS2hITLn8WcOc9BLJpawneuHa5NYbYhV5qUlz-ZSp-FkwDkqrJlP03eHD7VHGEEmj9qOLftm0pdBmdUQ_9haC40RBAk3vrjL-4mMSF&usqp=CAc',
      description: 'Apenas um test',
      amount: 1,
    },
  ],
  amount: 1,
  total: 2030.11,
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
