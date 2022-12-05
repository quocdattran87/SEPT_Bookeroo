import { GET_USER_ORDERS } from '../actions/types'

const initialState = {
    orders: [],
    userOrders: []
}
  
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      state.userOrders = action.payload
      return state
    default:
      return state
  }
}