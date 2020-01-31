import { action } from 'typesafe-actions'

export const Types = {
  ADD_TO_CART: '@cart/ADD_TO_CART',
  REMOVE_TO_CART: '@cart/REMOVE_TO_CART',
  UPDATE_AMOUNT_OF_PRODUCT: '@cart/UPDATE_AMOUNT_OF_PRODUCT',
}

export const addToCart = product => action(Types.ADD_TO_CART, product)
export const removeToCart = id => action(Types.REMOVE_TO_CART, id)
export const updateAmountOfProduct = (id, amount) =>
  action(Types.UPDATE_AMOUNT_OF_PRODUCT, { id, amount })
