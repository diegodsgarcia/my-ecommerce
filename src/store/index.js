import { createStore, combineReducers } from 'redux'
import { saveState } from './localStorage'

import cart from './cart'

const reducers = combineReducers({
  cart,
})

const store = createStore(reducers)

store.subscribe(() => {
  saveState(store.getState())
})

export default store
