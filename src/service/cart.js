import {
  addToCart,
  updateAmountOfProduct,
  removeToCart,
} from '../store/cart/actions'

function addInCart(cart, product) {
  const cartItem =
    cart.products.length && cart.products.find(({ id }) => product.id === id)

  if (cartItem) {
    return updateAmountOfProduct(cartItem.id, cartItem.amount + 1)
  } else {
    return addToCart({ ...product, amount: 1 })
  }
}

function removeInCart(cartItem) {
  return removeToCart(cartItem.id)
}

function updateCartAmount(cartItem, amount) {
  if (amount >= 1) {
    return updateAmountOfProduct(cartItem.id, amount)
  } else {
    return updateAmountOfProduct(cartItem.id, 1)
  }
}

function calculateAmount(cartList) {
  return cartList
    .map(item => item.amount)
    .reduce((count, value) => count + value, 0)
}

function calculateTotal(cartList) {
  return cartList
    .map(item => item.price * item.amount)
    .reduce((count, value) => count + value, 0)
}

export {
  addInCart,
  removeInCart,
  updateCartAmount,
  calculateAmount,
  calculateTotal,
}
