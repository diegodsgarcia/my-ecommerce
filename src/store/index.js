import { createStore, combineReducers } from 'redux'

import cart from './cart'

const reducers = combineReducers({
  cart,
})

const store = createStore(reducers)

export default store
