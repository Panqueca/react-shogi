const initialState = {
  transactions: [],
}

const transactionReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TRANSACTIONS':
      return {
        ...state,
        transactions: action.data,
      }
    default:
      return state
  }
}

export default transactionReducers
