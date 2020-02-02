function loadState(INITIAL_STATE, prop) {
  const serializedState = localStorage.getItem('state')
  if (serializedState === null) {
    return INITIAL_STATE
  }
  return JSON.parse(serializedState)[prop]
}

function saveState(state) {
  const serializedState = JSON.stringify(state)
  localStorage.setItem('state', serializedState)
}

export { loadState, saveState }
